import { buildIcebreakerPrompt } from "@/lib/ai/prompts/buildIcebreakerPrompt";
import { generateWithFallback } from "@/lib/ai/providers/fallback";
import { getMatchWithUsersAndRoutes } from "@/server/queries/match";
import { getRecentMessages } from "@/server/queries/message";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      currentUserId,
      targetUserId,
      conversationId,
      matchId,
    } = body;

    const match =
      await getMatchWithUsersAndRoutes(matchId);

    const recentMessages =
      await getRecentMessages(conversationId);

    if (!match) {
      return Response.json(
        { error: "Match not found" },
        { status: 404 }
      );
    }

    const currentUser =
      match.user1.id === currentUserId
        ? match.user1
        : match.user2;

    const targetUser =
      match.user1.id === currentUserId
        ? match.user2
        : match.user1;

    const prompt = buildIcebreakerPrompt({
      currentUser,
      targetUser,
      match,
      recentMessages,
    });

    const text = await generateWithFallback(prompt);

    let suggestions: string[] = [];

    try {
      // Clean up the text in case it has markdown code blocks
      const cleanedText = text.replace(/```json\n?|```/g, "").trim();
      suggestions = JSON.parse(cleanedText);
    } catch {
      suggestions = text
        .split("\n")
        .map(s => s.trim().replace(/^-\s*/, ""))
        .filter(s => s.length > 0 && !s.startsWith("[") && !s.endsWith("]"));
    }

    return Response.json({
      suggestions,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Failed to generate icebreakers",
      },
      {
        status: 500,
      }
    );
  }
}