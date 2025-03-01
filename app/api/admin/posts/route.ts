import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// ✅ Fetch all posts (Admin only)
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const posts = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      featured: true,
      published: true,
      postImage: true,
      createdAt: true,
      author: {
        select: { name: true },
      },
    },
  });

  return NextResponse.json(posts);
}

// ✅ Toggle featured status (Admin only)
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { postId, featured } = await req.json();
  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  const updatedPost = await prisma.post.update({
    where: { id: postId },
    data: { featured },
  });

  return NextResponse.json(updatedPost);
}

// ✅ Delete post and remove image from Cloudinary
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { postId, imagePublicId } = await req.json();

  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  // Remove post from database
  await prisma.post.delete({ where: { id: postId } });

  // Delete image from Cloudinary if it exists
  if (imagePublicId) {
    const cloudinaryRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          public_id: imagePublicId,
          api_key: process.env.CLOUDINARY_API_KEY,
          timestamp: Math.floor(Date.now() / 1000),
          signature: process.env.CLOUDINARY_API_SECRET, // Only works with signed upload
        }),
      }
    );

    if (!cloudinaryRes.ok) {
      console.error("Failed to delete image from Cloudinary");
    }
  }

  return NextResponse.json({ message: "Post deleted successfully" });
}
