"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { token } = useParams(); // Get token from URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("/api/reset-password", {
        token,
        newPassword,
      });
      setMessage(res.data.message);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Something went wrong");
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center py-10 bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Enter New Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="Enter password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {message && <p className="text-green-500 text-sm">{message}</p>}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button className="w-full" type="submit">
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
