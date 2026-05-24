import { buildIcebreakerPrompt } from "@/lib/ai/prompts/buildIcebreakerPrompt";

import { geminiModel } from "@/lib/ai/providers/gemini";

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

    const result =
      await geminiModel.generateContent(prompt);

    const text = result.response.text();

    let suggestions: string[] = [];

    try {
      suggestions = JSON.parse(text);
    } catch {
      suggestions = text
        .split("\n")
        .filter(Boolean);
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