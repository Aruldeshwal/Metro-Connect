import { useState, useEffect, useCallback } from "react";

interface Recommendation {
  user: {
    id: string;
    name: string;
    profile_picture_url?: string;
  };
  route: {
    id: string;
    startStation: { name: string };
    endStation: { name: string };
  };
  myRouteId: string;
  overlappingStations: string[];
  overlappingCount: number;
  matchScore: number;
}

export function useRecommendations(userId: string | undefined) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [hasActiveRoutes, setHasActiveRoutes] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(async () => {
    if (!userId) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/matches/recommendations?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch recommendations");
      }
      const data = await response.json();
      
      setRecommendations(data.recommendations || []);
      setHasActiveRoutes(data.hasActiveRoutes || false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const connect = async (targetUserId: string, myRouteId: string, targetRouteId: string, matchScore: number) => {
    try {
      const res = await fetch("/api/matches/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetUserId, myRouteId, targetRouteId, matchScore }),
      });
      if (!res.ok) throw new Error("Failed to connect");
      return await res.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  return { recommendations, hasActiveRoutes, isLoading, error, refetch: fetchRecommendations, connect };
}
