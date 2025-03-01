import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { username: string } }
) {
  const session = await getServerSession(authOptions);
  const loggedInUserId = session?.user?.id; // Get logged-in user's ID

  const { username } = await params;
  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;
  const skip = (page - 1) * limit;

  // Find the author first
  const author = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      bio: true,
    },
  });

  if (!author) {
    return NextResponse.json({ error: "Author not found" }, { status: 404 });
  }

  // fetch posts, filtering based on whether the logged-in user is the author
  const posts = await prisma.post.findMany({
    where: {
      authorId: author.id,
      ...(loggedInUserId === author.id ? {} : { published: true }), // Only show drafts to the author
    },
    skip,
    take: limit,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      createdAt: true,
      published: true,
      category: { select: { name: true } },
    },
  });

  const totalPosts = await prisma.post.count({
    where: {
      authorId: author.id,
      ...(loggedInUserId === author.id ? {} : { published: true }),
    },
  });

  return NextResponse.json({
    author: { ...author, posts }, // Attach posts separately
    totalPages: Math.ceil(totalPosts / limit),
  });
}
