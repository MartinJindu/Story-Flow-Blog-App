import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { slug } = await req.json();

    // Find current views
    const post = await prisma.post.findUnique({
      where: { slug },
      select: { views: true },
    });

    // Set new views count
    const newView = post?.views ? post.views + 1 : 1;

    // Update views count
    await prisma.post.update({
      where: { slug },
      data: { views: newView },
    });

    return NextResponse.json({ message: "View updated", views: newView });
  } catch (_error) {
    return NextResponse.json({ error: "View not updated" }, { status: 500 });
  }
}
