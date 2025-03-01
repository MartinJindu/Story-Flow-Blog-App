import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import crypto from "crypto";

const prisma = new PrismaClient();

// to generate signature for cloudinary
function generateSignature(publicId: string) {
  const timestamp = Math.floor(Date.now() / 1000);
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  return crypto.createHash("sha256").update(signatureString).digest("hex");
}

// GET: Fetch user profile
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        image: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

// PUT: Update user profile
export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { name, username, bio, image } = await req.json();

    // Ensure username is unique
    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser && existingUser.id !== session.user.id) {
      return NextResponse.json(
        { error: "Username already taken" },
        { status: 400 }
      );
    }

    // to delete already exiting photo on cloudinary
    try {
      // Extract public_id from Cloudinary URL
      if (existingUser?.image) {
        const publicId = existingUser?.image.split("/").pop()?.split(".")[0]; // Extract public_id
        await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
          new URLSearchParams({
            public_id: publicId!,
            api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
            timestamp: String(Math.floor(Date.now() / 1000)),
            signature: generateSignature(publicId!), // Generates a signature
          })
        );
      }
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to delete image from Cloudinary" },
        { status: 400 }
      );
    }

    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { name, username, bio, image },
      select: { id: true, name: true, username: true, bio: true, image: true },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
