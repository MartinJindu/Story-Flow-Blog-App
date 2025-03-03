"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import RichTextEditor from "@/components/TipTapEditorMain";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getCategory } from "@/StoreSlices/Category/categorySlice";
import { createPost } from "@/StoreSlices/Post/postSlice";
import CreatePostSkeleton from "@/components/skeleton/CreatePostSkeleton";
import NoSessionCard from "@/components/NoSessionCard";
import UploadImage from "@/components/UploadImage";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePostPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { categories, loading } = useSelector(
    (state: RootState) => state.category
  );
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // Markdown content
  const [categoryId, setCategoryId] = useState("");
  const [postImage, setPostImage] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(true);
  const [error, setError] = useState("");
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    dispatch(getCategory()); // fetch categories
  }, []);

  useEffect(() => {
    if (title && categoryId && content && description) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [title, categoryId, content, description]);

  if (!session) {
    return <NoSessionCard />;
  }

  if (loading) return <CreatePostSkeleton />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!title || !categoryId || !content) {
      toast.error("Please fill required* fields");
      return;
    }
    const trimmedTitle = title.trim();

    try {
      await dispatch(
        createPost({
          title: trimmedTitle,
          content,
          categoryId,
          postImage,
          description,
          published,
        })
      );

      toast.success("Post created successfully!");
      router.push("/posts");
    } catch (_error) {
      setError("Failed to create post.");
      toast.error("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl xl:max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Create Post</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title*</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <select
          className="w-full border rounded p-2"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select a Category*</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <div>
          <Label htmlFor="postImage">Post Image</Label>
          <UploadImage setImageUrl={setPostImage} />
        </div>

        {postImage && (
          <img src={postImage} width="500" height="300" alt="Post Image" />
        )}

        <div>
          <Label htmlFor="description">Description*</Label>
          <Textarea
            rows={2}
            placeholder="Brief Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        {/* TipTap Editor */}
        <div>
          <Label htmlFor="content">Content*</Label>
          <RichTextEditor initialContent="" onChange={setContent} />
        </div>

        <hr className="my-4" />

        <div>
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />{" "}
          <Label htmlFor="published">
            Publish <br /> <small>( Leave Unchecked to save as draft )</small>
          </Label>
        </div>
        <hr />
        <Button type="submit" disabled={disable}>
          Create Post
        </Button>
      </form>
    </div>
  );
}
