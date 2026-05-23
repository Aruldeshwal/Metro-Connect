import { prisma } from "@/lib/database";
export async function getRecentMessages(
  conversationId: string
) {
  return prisma.message.findMany({
  where: {
    conversation_id: conversationId,
  },
  orderBy: {
    timestamp: "desc",
  },
  take: 10,
});
}