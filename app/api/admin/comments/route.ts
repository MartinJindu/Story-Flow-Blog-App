import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

// ✅ Fetch comments (filter by post title)
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const postTitle = searchParams.get("postTitle")?.toLowerCase();

  const comments = await prisma.comment.findMany({
    where: postTitle
      ? {
          post: {
            title: {
              contains: postTitle, // Partial match search
              // mode: "insensitive", // Case insensitive
            },
          },
        }
      : undefined,
    include: {
      author: { select: { name: true, email: true } },
      post: { select: { title: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(comments);
}

// ✅ Delete a comment
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json(
      { error: "Comment ID is required" },
      { status: 400 }
    );
  }

  await prisma.comment.delete({ where: { id } });

  return NextResponse.json({ message: "Comment deleted successfully" });
}
