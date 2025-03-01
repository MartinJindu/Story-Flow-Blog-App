import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/option";

const prisma = new PrismaClient();

// ✅ Get analytics data
export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const totalUsers = await prisma.user.count();
  const totalPosts = await prisma.post.count();
  const totalComments = await prisma.comment.count();
  const totalViews = await prisma.post.aggregate({
    _sum: { views: true },
  });

  const mostPopularPosts = await prisma.post.findMany({
    orderBy: { views: "desc" },
    take: 5,
    select: { id: true, title: true, views: true },
  });

  const mostActiveAuthors = await prisma.user.findMany({
    orderBy: {
      posts: { _count: "desc" },
    },
    take: 5,
    select: {
      id: true,
      name: true,
      username: true,
      _count: { select: { posts: true } },
    },
  });

  return NextResponse.json({
    totalUsers,
    totalPosts,
    totalComments,
    totalViews: totalViews._sum.views || 0,
    mostPopularPosts,
    mostActiveAuthors,
  });
}
