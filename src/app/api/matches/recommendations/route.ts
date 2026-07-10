import { NextResponse } from "next/server";
import { findMatchRecommendations } from "@/server/queries/match";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const recommendations = await findMatchRecommendations(userId);

    // Also check if the user has any active routes to provide better UI feedback
    const userRouteCount = await prisma.userDailyRoute.count({
      where: { user_id: userId, is_active: true }
    });

    return NextResponse.json({
      recommendations,
      hasActiveRoutes: userRouteCount > 0
    });
  } catch (error) {
    console.error("Error fetching match recommendations:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
