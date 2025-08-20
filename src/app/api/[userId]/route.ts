import { NextResponse } from 'next/server';
import { prisma } from '@/lib/database';

/**
 * Handles GET requests to retrieve a single user's profile by their ID.
 * This is a dynamic API route where the user's ID is passed in the URL path.
 *
 * @param req The Next.js request object.
 * @param params An object containing the dynamic route parameters, in this case, { userId }.
 * @returns A JSON response containing the user's profile data or an error message.
 */
export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // 1. Extract the dynamic userId from the URL parameters.
    const { userId } = params;

    // 2. Validate that a userId was provided.
    if (!userId) {
      return NextResponse.json(
        { message: 'User ID is required.' },
        { status: 400 }
      );
    }

    // 3. Use Prisma to find the unique user record in the 'users' table.
    //    'findUnique()' is the most efficient method for retrieving a single record by its primary key.
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      // Optionally, you can 'select' only specific public fields
      // to avoid exposing sensitive data, e.g.,
      // select: {
      //   id: true,
      //   name: true,
      //   bio: true,
      //   profile_picture_url: true,
      //   interests: true,
      //   occupation: true,
      // }
    });

    // 4. Handle the case where the user is not found.
    if (!user) {
      return NextResponse.json(
        { message: `User with ID '${userId}' not found.` },
        { status: 404 }
      );
    }

    // 5. If the user is found, return their data as a JSON response.
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    // 6. Handle any unexpected errors during the database operation.
    console.error(`Error fetching user profile for ID '${params.userId}':`, error);
    return NextResponse.json(
      { message: 'Failed to retrieve user profile.', error: (error as Error).message },
      { status: 500 }
    );
  }
}