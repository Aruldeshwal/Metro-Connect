import { NextResponse } from "next/server";
import { prisma } from "@/lib/database";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const { userId: authUserId } = await auth();
    if (!authUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { targetUserId, myRouteId, targetRouteId, matchScore } = body;

    if (!targetUserId || !myRouteId || !targetRouteId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create or update match
    // user1_id should be the one with "smaller" ID to ensure uniqueness in the pair
    const [u1, u2] = [authUserId, targetUserId].sort();
    const [r1, r2] = authUserId === u1 ? [myRouteId, targetRouteId] : [targetRouteId, myRouteId];

    const match = await prisma.match.upsert({
      where: {
        user1_id_user2_id_user_daily_route1_id_user_daily_route2_id: {
          user1_id: u1,
          user2_id: u2,
          user_daily_route1_id: r1,
          user_daily_route2_id: r2,
        }
      },
      update: {
        status: "pending", // Reset to pending if it was rejected? Or maybe just keep it
        match_score: matchScore,
      },
      create: {
        user1_id: u1,
        user2_id: u2,
        user_daily_route1_id: r1,
        user_daily_route2_id: r2,
        overlapping_stations_count: 0, // Should ideally be calculated or passed
        match_score: matchScore,
        status: "pending",
      }
    });

    return NextResponse.json(match);
  } catch (error) {
    console.error("Connect error:", error);
    return NextResponse.json({ error: "Failed to connect" }, { status: 500 });
  }
}
