import { NextResponse } from "next/server";
import { prisma } from "@/lib/database";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { message: `User with ID '${userId}' not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: "Failed to retrieve user profile.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
