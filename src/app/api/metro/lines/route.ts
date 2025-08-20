import { NextResponse } from 'next/server'; // Import NextResponse for structured JSON responses
import { prisma } from '@/lib/database';    // Import your singleton Prisma Client instance

/**
 * Handles GET requests to retrieve all metro lines.
 * returns A JSON response containing an array of metro line objects or an error message.
 */
export async function GET() {
  try {
    // Fetch all metro lines from the database using Prisma Client.
    // The 'findMany()' method retrieves all records from the 'metro_lines' table.
    const lines = await prisma.metroLine.findMany({
      // You can use 'select' here if you wish to retrieve only specific fields
      // to reduce payload size, e.g.:
      // select: {
      //   id: true,
      //   name: true,
      //   color_hex: true,
      //   station_ids_sequence: true,
      // }
      // For now, fetching all fields is sufficient.
    });

    // Return the retrieved lines as a JSON response with a 200 OK status.
    return NextResponse.json(lines, { status: 200 });

  } catch (error) {
    // If an error occurs during the database operation, log it for debugging purposes.
    console.error("Error fetching metro lines:", error); // Corrected log message

    // Return a JSON error response with a 500 Internal Server Error status.
    // Include a user-friendly message and the actual error message for debugging.
    return NextResponse.json(
      { message: "Failed to retrieve metro lines.", error: (error as Error).message }, // Corrected error message
      { status: 500 }
    );
  }
}