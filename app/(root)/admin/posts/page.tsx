"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { AdminPost } from "@/lib/definitions";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get("/api/admin/posts");
        setPosts(res.data);
      } catch (_err) {
        setError("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const toggleFeatured = async (postId: string, currentStatus: boolean) => {
    try {
      await axios.put("/api/admin/posts", { postId, featured: !currentStatus });
      setPosts(
        posts.map((post) =>
          post.id === postId ? { ...post, featured: !currentStatus } : post
        )
      );
    } catch (_err) {
      setError("Failed to update featured status");
    }
  };

  const deletePost = async (postId: string, postImage: string) => {
    try {
      const publicId = postImage.split("/").pop()?.split(".")[0]; // Extract Cloudinary public ID
      await axios.delete("/api/admin/posts", {
        data: { postId, imagePublicId: publicId },
      });
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (_err) {
      setError("Failed to delete post");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post Management</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Image</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Featured</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border">
              <td className="border p-2">
                {post.postImage && (
                  <Image
                    src={post.postImage}
                    alt={post.title}
                    width={50}
                    height={50}
                    className="rounded"
                  />
                )}
              </td>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.author.name}</td>
              <td className="border p-2">
                <button
                  onClick={() => toggleFeatured(post.id, post.featured)}
                  className={`px-2 py-1 rounded ${
                    post.featured ? "bg-green-500 text-white" : "bg-gray-300"
                  }`}
                >
                  {post.featured ? "Yes" : "No"}
                </button>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => deletePost(post.id, post.postImage)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
