"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { AnalyticsData } from "@/lib/definitions";

export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const res = await axios.get("/api/admin/analytics");
        setAnalytics(res.data);
      } catch (_err) {
        setError("Failed to fetch analytics");
      }
    }
    fetchAnalytics();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!analytics) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">📊 Admin Analytics</h1>

      <div className="grid grid-cols-2 gap-4 text-white">
        <div className="bg-blue-500 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-3xl">{analytics.totalUsers}</p>
        </div>
        <div className="bg-green-500 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Total Posts</h2>
          <p className="text-3xl">{analytics.totalPosts}</p>
        </div>
        <div className="bg-yellow-500 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Total Comments</h2>
          <p className="text-3xl">{analytics.totalComments}</p>
        </div>
        <div className="bg-purple-500 p-4 rounded-lg">
          <h2 className="text-xl font-bold">Total Views</h2>
          <p className="text-3xl">{analytics.totalViews}</p>
        </div>
      </div>

      {/* Popular post */}
      <h2 className="text-xl font-bold mt-6">🔥 Most Popular Posts</h2>
      <ul className="mt-2 border rounded-lg p-4 bg-white">
        {analytics.mostPopularPosts.map((post) => (
          <li key={post.id} className="border-b p-2">
            <span className="font-semibold">{post.title}</span> - {post.views}{" "}
            views
          </li>
        ))}
      </ul>

      {/* Active Authors */}
      <h2 className="text-xl font-bold mt-6">💡 Most Active Authors</h2>
      <ul className="mt-2 border rounded-lg p-4 bg-white">
        {analytics.mostActiveAuthors.map((author) => (
          <li key={author.id} className="border-b p-2">
            <span className="font-semibold">
              {author.name} (@{author.username})
            </span>{" "}
            - {author._count.posts} posts
          </li>
        ))}
      </ul>
    </div>
  );
}
