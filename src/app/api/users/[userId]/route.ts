// src/app/api/users/[userId]/route.ts

import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
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
    const {
      name,
      bio,
      interests,
      social_media_link,
      occupation,
      birth_date,
      gender,
    } = body;

    if (!name || !gender) {
      return NextResponse.json(
        { message: "Name and gender are required." },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        bio,
        interests,
        social_media_link,
        occupation,
        birth_date,
        gender,
        email: user.emailAddresses[0]?.emailAddress,
        profile_picture_url: user.imageUrl,
      },
    });

    return NextResponse.json(
      { message: "Profile updated successfully!", data: updatedUser },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { message: "A user with this email already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "An error occurred while updating the profile." },
      { status: 500 }
    );
  }
}
