import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/database";

export async function PUT(
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
    let {
      start_station_id,
      end_station_id,
      days_of_week,
      preferred_start_time,
      calculated_station_ids_path,
    } = body;

    // Convert days_of_week to array if it's a string (from the UI)
    const daysArray = typeof days_of_week === 'string' 
      ? [parseInt(days_of_week)] 
      : Array.isArray(days_of_week) 
        ? days_of_week.map(d => typeof d === 'string' ? parseInt(d) : d)
        : [];

    if (
      !start_station_id ||
      !end_station_id ||
      daysArray.length === 0
    ) {
      return NextResponse.json(
        {
          message:
            "Start station, end station, and days of the week are required.",
        },
        { status: 400 }
      );
    }

    // Parse time string (HH:mm) to Date if provided
    let timeDate = null;
    if (preferred_start_time) {
      const [hours, minutes] = preferred_start_time.split(':');
      timeDate = new Date();
      timeDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    }

    const newRoute = await prisma.userDailyRoute.create({
      data: {
        user_id: userId,
        start_station_id,
        end_station_id,
        days_of_week: daysArray,
        preferred_start_time: timeDate,
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
    console.error("Route saving error:", error);
    return NextResponse.json(
      {
        message: "An error occurred while creating the route.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
