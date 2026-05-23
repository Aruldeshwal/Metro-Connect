import { Match, Message, User } from "@prisma/client";

type PromptData = {
  currentUser: User;
  targetUser: User;
  match: Match;
  recentMessages: Message[];
};

export function buildIcebreakerPrompt({
  currentUser,
  targetUser,
  match,
  recentMessages,
}: PromptData) {
  const sharedInterests =
    currentUser.interests.filter((interest) =>
      targetUser.interests.includes(interest)
    );

  const conversationStage =
    recentMessages.length === 0
      ? "new"
      : recentMessages.length < 10
      ? "early"
      : "active";

  return `
You are generating realistic conversation starters
for a metro commute social app.

CURRENT USER:
Name: ${currentUser.name}
Bio: ${currentUser.bio || "N/A"}
Occupation: ${currentUser.occupation || "N/A"}
Interests: ${currentUser.interests.join(", ")}
Gender: ${currentUser.gender || "N/A"}

TARGET USER:
Name: ${targetUser.name}
Bio: ${targetUser.bio || "N/A"}
Occupation: ${targetUser.occupation || "N/A"}
Interests: ${targetUser.interests.join(", ")}
Gender: ${targetUser.gender || "N/A"}

MATCH CONTEXT:
Match Score: ${match.match_score || "N/A"}
Shared Interests: ${sharedInterests.join(", ")}
Common Stations Count: ${match.overlapping_stations_count}
Conversation Stage: ${conversationStage}

RECENT CONVERSATION:
${recentMessages
  .map(
    (msg) =>
      `${msg.sender_id === currentUser.id ? "Current User" : "Target User"}: ${msg.content}`
  )
  .join("\n")}

RULES:
- Generate 4 responses
- Sound natural
- Casual metro commuter tone
- Avoid cringe
- Avoid pickup lines
- Max 15 words
- Make them context aware
- Avoid repeating previous messages

Return JSON array only.
`;
}