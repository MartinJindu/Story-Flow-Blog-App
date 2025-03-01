import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import slugify from "slugify";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/option";
import axios from "axios";

const prisma = new PrismaClient();

function generateSignature(publicId: string) {
  const timestamp = Math.floor(Date.now() / 1000);
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  return crypto.createHash("sha256").update(signatureString).digest("hex");
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
      where: { slug: slug },
      include: {
        author: { select: { id: true, username: true, name: true } },
        category: { select: { name: true, slug: true } },
      },
    });

    if (!post)
      return NextResponse.json({ error: "Post not found" }, { status: 404 });

    return NextResponse.json(post);
  } catch (_error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  try {
    const body = await req.json();
    const { title, categoryId, content, published, postImage, description } =
      body;

    if (!title || !categoryId || !content) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Get the existing post
    const existingPost = await prisma.post.findUnique({
      where: { slug: slug },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    let newSlug = existingPost.slug;

    // If the title is changed, generate a new slug
    if (title !== existingPost.title) {
      newSlug = slugify(title, { lower: true, strict: true });

      // Ensure the slug is unique
      let slugExists = await prisma.post.findUnique({
        where: { slug: newSlug },
      });
      let count = 1;
      while (slugExists) {
        newSlug = slugify(title, { lower: true, strict: true }) + `-${count}`;
        slugExists = await prisma.post.findUnique({ where: { slug: newSlug } });
        count++;
      }
    }

    try {
      // Extract public_id from Cloudinary URL
      if (existingPost.postImage) {
        const publicId = existingPost.postImage.split("/").pop()?.split(".")[0]; // Extract public_id
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
    } catch (_error) {
      return NextResponse.json(
        { error: "Failed to delete image from Cloudinary" },
        { status: 400 }
      );
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { slug: slug },
      data: {
        title,
        categoryId,
        content,
        slug: newSlug,
        published,
        postImage,
        description,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedPost);
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

// Function to delete a post
async function deletePostBySlug(slug: string, userId: string) {
  // Find the post
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post)
    return NextResponse.json({ error: "Post not found" }, { status: 404 });

  // Ensure the logged-in user is the author
  if (post.authorId !== userId)
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  try {
    // Extract public_id from Cloudinary URL
    if (post.postImage) {
      const publicId = post.postImage.split("/").pop()?.split(".")[0]; // Extract public_id
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
  } catch (_error) {
    return NextResponse.json(
      { error: "Failed to delete image from Cloudinary" },
      { status: 400 }
    );
  }

  // Delete the post
  await prisma.post.delete({ where: { slug } });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await deletePostBySlug(slug, session.user?.id);
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: "Post not deleted successfully" },
        { status: 400 }
      );
    }
  }
}
