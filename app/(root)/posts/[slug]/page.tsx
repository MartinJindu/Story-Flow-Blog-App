"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CommentSection from "@/components/CommentSection";
import DeletePostModal from "@/components/DeletePostModal";
import { formatDistanceToNow } from "date-fns";
import { useSession } from "next-auth/react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSinglePost, deletePost } from "@/StoreSlices/Post/postSlice";
import { AppDispatch, RootState } from "@/store";
import SinglePostSkeleton from "@/components/skeleton/SinglePostSkeleton";
import { toast } from "sonner";
import DOMPurify from "dompurify";
import defaultPostImage from "@/public/default_post_image.webp";
import axios from "axios";

export default function SinglePostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { singlePost, loading } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch<AppDispatch>();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  console.log(slug);

  useEffect(() => {
    if (slug) {
      dispatch(fetchSinglePost(slug as string));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    const updateView = async () => {
      await axios.post(`/api/update-views`, { slug });
    };
    updateView();
  }, []);

  const handleDelete = async () => {
    try {
      await dispatch(deletePost(singlePost?.slug as string));
      toast.success("Post deleted successfully");
      router.push("/posts");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) return <SinglePostSkeleton />;

  if (!singlePost)
    return <p className="text-center mt-10 text-red-500">Post not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="relative w-full h-64 md:h-96 mb-4">
        {singlePost?.postImage ? (
          <Image
            src={singlePost.postImage}
            alt={singlePost.title}
            fill
            className="object-cover rounded-lg"
          />
        ) : (
          <Image
            src={defaultPostImage}
            alt="default"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <Link href={`/category/${singlePost.category.slug}`}>
        <span className="bg-violet-100 text-violet-600 px-3 py-1 text-xs font-semibold self-start">
          {singlePost.category?.name}
        </span>
      </Link>

      <h1 className="text-3xl capitalize font-bold mt-2">{singlePost.title}</h1>
      <p className="text-gray-600 mt-1">
        <Link href={`/author/${singlePost.author.username}`}>
          By{" "}
          <span className="font-semibold capitalize">
            {singlePost.author.name}
          </span>
        </Link>
        •{" "}
        {formatDistanceToNow(new Date(singlePost.createdAt), {
          addSuffix: true,
        })}{" "}
        ({new Date(singlePost.createdAt).toLocaleDateString()})
      </p>

      <div
        className="prose max-w-full break-word whitespace-pre-line mt-6"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(singlePost.content) as string,
        }}
      />

      <hr className="my-6" />
      {session?.user?.id === singlePost.authorId && (
        <div className="flex gap-5 justify-end mt-6">
          <Button type="button" className="hover:bg-blue-500">
            <Link href={`/posts/edit/${singlePost.slug}`}>Edit</Link>
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </div>
      )}

      <hr className="my-6" />
      <CommentSection postId={singlePost.id} />

      {/* Delete Confirmation Modal */}
      <DeletePostModal
        title={singlePost.title}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
      />
    </div>
  );
}
