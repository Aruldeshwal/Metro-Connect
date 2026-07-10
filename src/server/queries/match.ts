import { prisma } from "@/lib/database";
import { calculateOverlap } from "@/lib/match/calculateOverlap";
import { calculateMatchScore } from "@/lib/match/calculateMatchScore";

export async function getMatchWithUsersAndRoutes(
  matchId: string
) {
  return prisma.match.findUnique({
    where: {
      id: matchId,
    },
    include: {
      user1: true,
      user2: true,
      route1: {
        include: {
          startStation: true,
          endStation: true,
        },
      },
      route2: {
        include: {
          startStation: true,
          endStation: true,
        },
      },
    },
  });
}

export async function findMatchRecommendations(userId: string) {
  // 1. Get current user's active routes
  const currentUserRoutes = await prisma.userDailyRoute.findMany({
    where: {
      user_id: userId,
      is_active: true,
    },
  });

  if (currentUserRoutes.length === 0) return [];

  // 2. Get all other users' active routes
  const otherUsersRoutes = await prisma.userDailyRoute.findMany({
    where: {
      user_id: { not: userId },
      is_active: true,
    },
    include: {
      user: true,
      startStation: true,
      endStation: true,
    },
  });

  const recommendations = [];

  // 3. Compare each of current user's routes with others
  for (const myRoute of currentUserRoutes) {
    for (const otherRoute of otherUsersRoutes) {
      const overlap = calculateOverlap(
        myRoute.calculated_station_ids_path,
        otherRoute.calculated_station_ids_path
      );

      if (overlap.length > 0) {
        const score = calculateMatchScore(
          overlap.length,
          myRoute.calculated_station_ids_path.length,
          otherRoute.calculated_station_ids_path.length
        );

        recommendations.push({
          user: otherRoute.user,
          route: otherRoute,
          myRouteId: myRoute.id,
          overlappingStations: overlap,
          overlappingCount: overlap.length,
          matchScore: score,
        });
      }
    }
  }

  // 4. Sort by matchScore descending and return
  return recommendations.sort((a, b) => b.matchScore - a.matchScore);
}