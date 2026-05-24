import { Message, User } from "@prisma/client";

type PromptData = {
  currentUser: User;
  targetUser: User;
  recentMessages: Message[];
};

export function buildSmartReplyPrompt({
  currentUser,
  targetUser,
  recentMessages,
}: PromptData) {
  const lastMessage = recentMessages[0];
  const isLastMessageFromTarget = lastMessage?.sender_id === targetUser.id;

  return `
You are an AI assistant for a metro commute social app.
Generate 3 short, natural, and context-aware "smart replies" for the current user based on the recent conversation.

CURRENT USER: ${currentUser.name}
TARGET USER: ${targetUser.name}

RECENT CONVERSATION (newest first):
${recentMessages
  .map(
    (msg) =>
      `${msg.sender_id === currentUser.id ? "Current User" : "Target User"}: ${msg.content}`
  )
  .join("\n")}

CONTEXT:
${isLastMessageFromTarget ? `The last message was from ${targetUser.name}. Generate replies to this message.` : `The last message was from ${currentUser.name}. Generate follow-up replies or responses.`}

RULES:
- Generate exactly 3 replies
- Max 10 words each
- Casual, friendly, and natural metro commuter tone
- Avoid generic "Yes/No/Ok" if possible
- Context-aware based on the latest message

Return JSON array of strings only.
`;
}
