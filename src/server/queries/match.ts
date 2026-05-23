import { prisma } from "@/lib/database";

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