import { prisma } from "@/lib/database";
import { buildSmartReplyPrompt } from "@/lib/ai/prompts/buildSmartReplyPrompt";
import { generateWithFallback } from "@/lib/ai/providers/fallback";

export async function POST(req: Request) {
  try {
    const { currentUserId, targetUserId, conversationId } = await req.json();

    const currentUser = await prisma.user.findUnique({ where: { id: currentUserId } });
    const targetUser = await prisma.user.findUnique({ where: { id: targetUserId } });
    const recentMessages = await prisma.message.findMany({
      where: { conversation_id: conversationId },
      orderBy: { timestamp: "desc" },
      take: 5,
    });

    if (!currentUser || !targetUser) {
      return Response.json({ error: "Users not found" }, { status: 404 });
    }

    const prompt = buildSmartReplyPrompt({
      currentUser,
      targetUser,
      recentMessages,
    });

    const text = await generateWithFallback(prompt);

    let replies: string[] = [];
    try {
      const cleanedText = text.replace(/```json\n?|```/g, "").trim();
      replies = JSON.parse(cleanedText);
    } catch {
      replies = text.split("\n").map(s => s.trim().replace(/^-\s*/, "")).filter(s => s.length > 0);
    }

    return Response.json({ replies: replies.slice(0, 3) });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to generate smart replies" }, { status: 500 });
  }
}
