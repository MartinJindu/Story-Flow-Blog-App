import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const category = await prisma.category.findUnique({
      where: { slug: slug },
      include: {
        posts: { include: { author: { select: { username: true } } } },
      }, // Include posts & authors
    });

    if (!category) {
      return NextResponse.json(
        { error: "category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(category, { status: 200 });
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to load categories" },
      { status: 500 }
    );
  }
}
