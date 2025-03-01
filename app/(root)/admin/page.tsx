"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Wait for session to load
    if (!session || session.user?.role !== "ADMIN") {
      router.push("/"); // Redirect non-admin users
    }
  }, [session, status, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>You are not authorized to view this page.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-gray-600 mb-6">
        Manage users, posts, categories, and more.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <Link href="/admin/users">
          <div className="p-4 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600">
            Manage Users
          </div>
        </Link>

        <Link href="/admin/posts">
          <div className="p-4 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600">
            Manage Posts
          </div>
        </Link>

        <Link href="/admin/categories">
          <div className="p-4 bg-purple-500 text-white rounded-lg cursor-pointer hover:bg-purple-600">
            Manage Categories
          </div>
        </Link>

        <Link href="/admin/comments">
          <div className="p-4 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600">
            Manage Comments
          </div>
        </Link>

        <Link href="/admin/analytics">
          <div className="p-4 bg-yellow-500 text-white rounded-lg cursor-pointer hover:bg-yellow-600">
            Analytics
          </div>
        </Link>
      </div>
    </div>
  );
}
