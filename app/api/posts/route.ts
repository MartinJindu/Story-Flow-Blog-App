import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: { select: { name: true, username: true } },
        category: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" }, // Latest posts first
    });

    return NextResponse.json(posts, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
