"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPost } from "@/StoreSlices/Post/postSlice";
import { AppDispatch, RootState } from "@/store";

import LatestPostsSkeleton from "@/components/skeleton/LatestPostsSkeleton";
import defaultPostImage from "@/public/default_post_image.webp";

export default function BlogPostsPage() {
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.post
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllPost());
  }, []);

  if (loading) return <LatestPostsSkeleton title="Posts" />;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-md  overflow-hidden">
            {/* Post Image */}
            {post.postImage ? (
              <div className="relative w-full h-56">
                <Image
                  src={post.postImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="relative w-full h-56">
                <Image
                  src={defaultPostImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Post Details */}
            <div className="p-4">
              {/* Category */}
              <Link href={`/category/${post.category.slug}`}>
                <span className="bg-violet-100 text-violet-600 px-3 py-1 text-xs font-semibold  self-start">
                  {post.category?.name}
                </span>
              </Link>
              {/* Title */}
              <Link href={`/posts/${post.slug}`}>
                <h2 className="text-lg capitalize font-bold mt-1">
                  {post.title}
                </h2>
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                By{" "}
                <Link href={`/author/${post.author?.username}`}>
                  <span className="font-medium text-gray-700 capitalize">
                    {post.author?.name}
                  </span>
                </Link>{" "}
                •{" "}
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>

              {/* post Description */}
              <p className="text-gray-700 text-sm mt-2 line-clamp-3">
                {post.description}
              </p>

              {/* Read More */}
              <Link
                href={`/posts/${post.slug}`}
                className="text-blue-500 text-sm mt-2 inline-block"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
