"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "ADMIN" | "USER";
}

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await axios.get("/api/admin/users");
        setUsers(res.data);
      } catch (err) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const updateRole = async (userId: string, newRole: "ADMIN" | "USER") => {
    try {
      await axios.put("/api/admin/users", { userId, role: newRole });
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      setError("Failed to update role");
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await axios.delete("/api/admin/users", { data: { userId } });
      setUsers(users.filter((u) => u.id !== userId));
    } catch (err) {
      setError("Failed to delete user");
    }
  };

  if (!session || session.user?.role !== "ADMIN") {
    return <p className="text-center text-red-500">Access Denied</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">@{user.username}</td>
              <td className="border p-2">
                <select
                  value={user.role}
                  onChange={(e) =>
                    updateRole(user.id, e.target.value as "ADMIN" | "USER")
                  }
                  className="border rounded p-1"
                >
                  <option value="USER">User</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </td>
              <td className="border p-2">
                <button
                  onClick={() => deleteUser(user.id)}
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
