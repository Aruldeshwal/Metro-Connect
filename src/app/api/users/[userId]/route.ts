import { NextResponse } from "next/server";
import { prisma } from "@/lib/database";
import { auth } from "@clerk/nextjs/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = await params;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId: authUserId } = await auth();
    const { userId } = await params;

    if (!authUserId || authUserId !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { 
      name, 
      bio, 
      interests, 
      occupation, 
      social_media_link, 
      gender,
      birth_date 
    } = body;
const updatedUser = await prisma.user.upsert({
  where: { id: userId },
  update: {
    name,
    bio,
    interests,
    occupation,
    social_media_link,
    gender,
    birth_date: birth_date ? new Date(birth_date) : null,
  },
  create: {
    id: userId,
    name: name || "New User",
    email: null, // Email will be synced by webhook later if not provided here
    bio: bio || "",
    interests: interests || "",
    occupation: occupation || "",
    social_media_link: social_media_link || "",
    gender: gender || null,
    birth_date: birth_date ? new Date(birth_date) : null,
  },
});

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Update user error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
