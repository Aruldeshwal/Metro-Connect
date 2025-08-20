import { NextResponse } from 'next/server'; // Import NextResponse for structured JSON responses
import { prisma } from '@/lib/database';    // Import your singleton Prisma Client instance

/**
 * Handles GET requests to retrieve all metro stations.
 * returns A JSON response containing an array of metro station objects or an error message.
 */
export async function GET() {
  try {
    // Fetch all metro stations from the database using Prisma Client.
    // The 'findMany()' method retrieves all records from the 'metro_stations' table.
    const stations = await prisma.metroStation.findMany({
      // You can use 'select' here if you wish to retrieve only specific fields
      // to reduce payload size, e.g.:
      // select: {
      //   id: true,
      //   name: true,
      //   latitude: true,
      //   longitude: true,
      //   line_ids: true,
      // }
      // For now, fetching all fields is sufficient.
    });

    // Return the retrieved stations as a JSON response with a 200 OK status.
    return NextResponse.json(stations, { status: 200 });

  } catch (error) {
    // If an error occurs during the database operation, log it for debugging purposes.
    console.error("Error fetching metro stations:", error);

    // Return a JSON error response with a 500 Internal Server Error status.
    // Include a user-friendly message and the actual error message for debugging.
    return NextResponse.json(
      { message: "Failed to retrieve metro stations.", error: (error as Error).message },
      { status: 500 }
    );
  }
}