"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import UploadImage from "@/components/UploadImage";

interface User {
  id: string;
  name: string;
  username: string;
  bio?: string;
  image?: string;
  role: "USER" | "ADMIN"; // Include role for showing admin button
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/profile");
        setUser(res.data);
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Update state on input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (user) {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  // Handle image upload
  const handleImageUpload = (imageUrl: string) => {
    if (user) {
      setUser((prevUser) =>
        prevUser ? { ...prevUser, image: imageUrl } : null
      );
    }
  };

  // Save profile changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await axios.put("/api/profile", {
        name: user?.name,
        username: user?.username,
        bio: user?.bio,
        image: user?.image,
      });

      router.refresh();
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!user) return <p className="text-center py-10">User not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">Edit Profile</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="flex flex-col items-center">
        {user.image && (
          <Image
            src={user.image}
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full"
          />
        )}

        {/* Cloudinary Upload Widget */}

        <UploadImage setImageUrl={handleImageUpload} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <Input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Full Name"
          required
        />
        <Input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <Textarea
          name="bio"
          rows={4}
          value={user.bio || ""}
          onChange={handleChange}
          placeholder="Tell us about yourself..."
          className="w-full border rounded p-2"
        />

        <Button type="submit" className="w-full">
          Save Changes
        </Button>

        {/* Show Admin Dashboard button if the user is an admin */}
        {user.role === "ADMIN" && (
          <Button
            variant="outline"
            className="w-full mt-4"
            onClick={() => router.push("/admin")}
          >
            Go to Admin Dashboard
          </Button>
        )}
      </form>
    </div>
  );
}
