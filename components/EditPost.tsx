"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Post } from "@/lib/definitions";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getCategory } from "@/StoreSlices/Category/categorySlice";
import { fetchSinglePost } from "@/StoreSlices/Post/postSlice";
import CreatePostSkeleton from "./skeleton/CreatePostSkeleton";
import Image from "next/image";

// Dynamically import Tiptap
const TiptapEditor = dynamic(() => import("@/components/TipTapEditorMain"), {
  ssr: false,
});

export default function EditPostPage() {
  const { slug } = useParams();
  const router = useRouter();

  const { categories } = useSelector((state: RootState) => state.category);
  const { singlePost, loading } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch<AppDispatch>();

  const [_post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [postImage, setPostImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // fetching the post for editing
    dispatch(fetchSinglePost(slug as string));
  }, [dispatch, slug]);

  useEffect(() => {
    if (singlePost) {
      setPost(singlePost);
      setTitle(singlePost.title);
      setCategory(singlePost.categoryId);
      setContent(singlePost.content); // Pre-fill the Tiptap rich editor content
      setPostImage(singlePost.postImage as string);
      setDescription(singlePost.description);
      setPublished(singlePost.published || false);
    }
  }, [singlePost]);

  useEffect(() => {
    // fetching categories
    dispatch(getCategory());
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);

    try {
      // 1️⃣ Get signature from server
      const { data } = await axios.get("/api/upload");
      const { timestamp, signature, cloudName, uploadPreset } = data;

      // 2️⃣ Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      setPostImage(uploadResponse.data.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
    } finally {
      setImageUploading(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await axios.put(`/api/posts/${slug}`, {
        title,
        categoryId: category,
        content,
        published,
        postImage,
      });

      toast.success("Post updated successfully!");

      // Redirect to the new slug if it changed
      if (data.slug !== slug) {
        router.push(`/posts/${data.slug}`);
      } else {
        router.push(`/posts/${slug}`);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <CreatePostSkeleton />;
  if (!singlePost)
    return <p className="text-center text-red-500">Post not found</p>;

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Category */}
        <div>
          <Label htmlFor="category">Category</Label>
          <select
            className="w-full border rounded p-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <Label htmlFor="postImage">Post Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="cursor-pointer"
          />
          {imageUploading && <p>Uploading image...</p>}
        </div>

        {postImage && (
          <Image src={postImage} alt="Post Image" width={500} height={500} />
        )}

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Tiptap Editor */}
        <div>
          <Label htmlFor="content">Content</Label>
          <TiptapEditor initialContent={content} onChange={setContent} />
        </div>
        <hr className="mt-5" />
        <label>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />{" "}
          Publish <br /> <small>( Leave unchecked to save as draft)</small>
        </label>
        <hr />

        {/* Submit Button */}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Updating..." : "Update Post"}
        </Button>
      </form>
    </div>
  );
}
