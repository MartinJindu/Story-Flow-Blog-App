import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/option";
import slugify from "slugify";

const prisma = new PrismaClient();

// ✅ Fetch all categories
export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
      posts: { select: { id: true } }, // Count posts per category
    },
  });

  return NextResponse.json(categories);
}

// ✅ Create new category
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { name } = await req.json();
  if (!name) {
    return NextResponse.json(
      { error: "Category name is required" },
      { status: 400 }
    );
  }

  const slug = slugify(name, { lower: true });

  const category = await prisma.category.create({
    data: { name, slug },
  });

  return NextResponse.json(category);
}

// ✅ Update category name
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id, name } = await req.json();
  if (!id || !name) {
    return NextResponse.json(
      { error: "Category ID and name are required" },
      { status: 400 }
    );
  }

  const slug = slugify(name, { lower: true });

  const updatedCategory = await prisma.category.update({
    where: { id },
    data: { name, slug },
  });

  return NextResponse.json(updatedCategory);
}

// ✅ Delete category (only if no posts are linked)
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { id } = await req.json();
  if (!id) {
    return NextResponse.json(
      { error: "Category ID is required" },
      { status: 400 }
    );
  }

  const category = await prisma.category.findUnique({
    where: { id },
    include: { posts: true },
  });

  if (category?.posts.length) {
    return NextResponse.json(
      { error: "Cannot delete category with posts" },
      { status: 400 }
    );
  }

  await prisma.category.delete({ where: { id } });

  return NextResponse.json({ message: "Category deleted successfully" });
}
