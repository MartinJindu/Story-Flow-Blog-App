"use client";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

const prisma = new PrismaClient();

// Fetch category and posts
async function getCategory(slug: string) {
  return await prisma.category.findUnique({
    where: { slug },
    include: { posts: { include: { author: true } } }, // Include posts & authors
  });
}

export default async function CategoryPage() {
  const { slug } = useParams();
  const category = await getCategory(slug as string);

  if (!category) {
    return (
      <p className="text-center text-gray-500 mt-10">Category not found.</p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Category Name */}
      <div className="relative w-full h-40 md:h-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg ">
        <h1 className="text-4xl font-bold text-white uppercase tracking-wide">
          {category.name}
        </h1>
      </div>

      {/* Posts List */}
      <div className="mt-6 space-y-6">
        {category.posts.length > 0 ? (
          category.posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <Link href={`/posts/${post.slug}`} className="block">
                {post.postImage && (
                  <Image
                    src={post.postImage}
                    alt={post.title}
                    width={800}
                    height={500}
                    className="w-full h-fit md:h-72 object-cover rounded-md"
                  />
                )}
                <h2 className="text-xl font-bold mt-3 text-gray-900">
                  {post.title}
                </h2>
              </Link>

              {/* Author & Published Date */}
              <div className="text-sm text-gray-500 mt-2 flex justify-between items-center">
                <span>By {post.author.username}</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Short Description */}
              <p className="text-gray-700 mt-3">{post.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No posts found in this category. <br /> Be the first to{" "}
            <Link href={`/create`}>
              <span className="decoration underline text-blue-600 hover:text-blue-500">
                create
              </span>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
