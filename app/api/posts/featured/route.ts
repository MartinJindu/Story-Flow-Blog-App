import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const featuredPosts = await prisma.post.findMany({
      where: { featured: true },
      select: { id: true, title: true, slug: true, postImage: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(featuredPosts);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
