import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/database";
import { buildIcebreakerPrompt } from "@/lib/ai/prompts/buildIcebreakerPrompt";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      currentUserId,
      targetUserId,
      conversationId,
      matchId,
    } = body;

    const currentUser = await prisma.user.findUnique({
      where: { id: currentUserId },
    });

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
    });

    const match = await prisma.match.findUnique({
      where: {
        id: matchId,
      },
    });

    const recentMessages = await prisma.message.findMany({
      where: {
        conversation_id: conversationId,
      },
      orderBy: {
        timestamp: "desc",
      },
      take: 10,
    });

    if (
      !currentUser ||
      !targetUser ||
      !match
    ) {
      return Response.json(
        {
          error: "Missing data",
        },
        { status: 400 }
      );
    }

    const prompt = buildIcebreakerPrompt({
      currentUser,
      targetUser,
      match,
      recentMessages,
    });

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    let suggestions = [];

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
        error: "Failed to generate icebreakers",
      },
      {
        status: 500,
      }
    );
  }
}