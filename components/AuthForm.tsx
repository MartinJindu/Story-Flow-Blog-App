"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import logo from "@/public/blog.webp";

export default function AuthForm({ type }: { type: "signin" | "signup" }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (type === "signup") {
        await axios.post("/api/auth/signup", {
          name,
          username,
          email,
          password,
        });
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        toast.error("Invalid email or password");
      } else {
        if (type === "signup") {
          toast.success("Registered successfully!");
        } else {
          toast.success("Logged in");
        }

        router.push("/");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-lg rounded-lg">
        <CardHeader className="justify-center items-center">
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
            className="rounded-md"
          />
          <CardTitle className="text-center text-2xl font-semibold">
            {type === "signin" ? "Login" : "Sign Up"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {type === "signup" && (
              <>
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </>
            )}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Forgot Password Link for Sign In */}
            {type === "signin" && (
              <div className="text-right text-sm">
                <Link
                  href="/forgot-password"
                  className="text-blue-500 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button className="w-full" type="submit">
              {type === "signin" ? "Login" : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-gray-600">
            {type === "signin" ? (
              <>
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link href="/login" className="text-blue-500 hover:underline">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
