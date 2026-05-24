"use client";

import { useState, useCallback } from "react";

interface UseSmartRepliesProps {
  currentUserId: string;
  targetUserId: string;
  conversationId: string;
}

export function useSmartReplies({
  currentUserId,
  targetUserId,
  conversationId,
}: UseSmartRepliesProps) {
  const [replies, setReplies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSmartReplies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/messages/smart-reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentUserId,
          targetUserId,
          conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch smart replies");
      }

      const data = await response.json();
      setReplies(data.replies);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [currentUserId, targetUserId, conversationId]);

  return { replies, isLoading, error, fetchSmartReplies };
}
