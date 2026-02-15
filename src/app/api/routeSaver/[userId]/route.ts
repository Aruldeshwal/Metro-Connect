import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/database";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    const user = await currentUser();
    if (!user || user.id !== userId) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      start_station_id,
      end_station_id,
      days_of_week,
      preferred_start_time,
      calculated_station_ids_path,
    } = body;

    if (
      !start_station_id ||
      !end_station_id ||
      !days_of_week ||
      !Array.isArray(days_of_week) ||
      days_of_week.length === 0
    ) {
      return NextResponse.json(
        {
          message:
            "Start station, end station, and days of the week are required.",
        },
        { status: 400 }
      );
    }

    const newRoute = await prisma.userDailyRoute.create({
      data: {
        user_id: userId,
        start_station_id,
        end_station_id,
        days_of_week,
        preferred_start_time: preferred_start_time
          ? new Date(preferred_start_time)
          : null,
        calculated_station_ids_path,
        is_active: true,
      },
    });

    return NextResponse.json(
      {
        message: "Daily route created successfully!",
        data: newRoute,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "An error occurred while creating the route.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
