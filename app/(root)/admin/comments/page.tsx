"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Comment {
  id: string;
  content: string;
  post: { title: string };
  author: { name: string; email: string };
  createdAt: string;
}

export default function AdminCommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await axios.get("/api/admin/comments");
        setComments(res.data);
      } catch (err) {
        setError("Failed to fetch comments");
      }
    }
    fetchComments();
  }, []);

  const filterByTitle = async () => {
    try {
      const res = await axios.get(
        `/api/admin/comments?postTitle=${searchTitle}`
      );
      setComments(res.data);
    } catch (err) {
      setError("Failed to filter comments");
    }
  };

  const deleteComment = async (id: string) => {
    try {
      await axios.delete("/api/admin/comments", { data: { id } });
      setComments(comments.filter((c) => c.id !== id));
    } catch (err) {
      setError("Failed to delete comment");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Comment Management</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Filter Comments by Post Title */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Filter by Post Title"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
          className="border p-2 w-full"
        />
        <button
          onClick={filterByTitle}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Filter
        </button>
      </div>

      {/* Comment List */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Content</th>
            <th className="border p-2">Post</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment.id} className="border">
              <td className="border p-2">{comment.content}</td>
              <td className="border p-2">{comment.post.title}</td>
              <td className="border p-2">
                {comment.author.name} <br />
                <span className="text-gray-500 text-sm">
                  {comment.author.email}
                </span>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => deleteComment(comment.id)}
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
