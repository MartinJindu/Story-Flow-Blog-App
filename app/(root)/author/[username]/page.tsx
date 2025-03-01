"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchAuthor } from "@/StoreSlices/Author/authorSlice";
import AuthorSkeleton from "@/components/skeleton/AuthorSkeleton";

export default function AuthorPage() {
  const { username } = useParams();
  const { data: session } = useSession();
  const { author, posts, loading, totalPages } = useSelector(
    (state: RootState) => state.author
  );
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAuthor({ username: username as string, currentPage }));
  }, [username, currentPage]); // Re-run when username or page changes

  if (loading) return <AuthorSkeleton />;
  if (!author) return <p className="text-center py-10">Author not found</p>;

  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Author Info */}
        <div className="bg-gray-100 p-6  rounded-lg shadow-md md:col-span-1">
          <div className="text-center">
            {author.image && (
              <Image
                src={author.image}
                alt={author.name}
                width={120}
                height={120}
                className="rounded-full mx-auto"
              />
            )}
            <h1 className="text-2xl capitalize font-bold mt-4">
              {author.name}
            </h1>
            <p className="text-gray-600">@{author.username}</p>
          </div>
          {author.bio && <p className="mt-4 text-center">{author.bio}</p>}
          {session?.user.id === author.id && (
            <div className="flex justify-center py-4">
              <Link href={`/edit-profile`}>
                <Button>Edit</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Right: Author's Posts */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">
            Posts by <span className="capitalize">{author.name}</span>
          </h2>

          {posts.length === 0 ? (
            <p>No posts yet.</p>
          ) : (
            <ul className="space-y-4">
              {posts.map((post) => (
                <li key={post.id} className="bg-white p-4 rounded-lg shadow-md">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-xl font-semibold hover:underline"
                  >
                    <span className="capitalize">{post.title}</span>
                  </Link>

                  {/* Draft Badge for Unpublished Posts */}
                  {session?.user?.id === author.id && !post.published && (
                    <span className="bg-yellow-400 text-white text-xs font-semibold px-2 py-1 rounded-md ml-2">
                      Draft
                    </span>
                  )}

                  <p className="text-sm text-gray-500">
                    Category: {post.category.name} |{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 space-x-4">
              <button
                className={`px-4 py-2 bg-gray-300 rounded ${
                  currentPage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-400"
                }`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
              <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                className={`px-4 py-2 bg-gray-300 rounded ${
                  currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-400"
                }`}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
