"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Textarea } from "./ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getComments, postComment } from "@/StoreSlices/Comment/commentSlice";
import { Skeleton } from "./ui/skeleton";

export default function CommentSection({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const { loading, comments } = useSelector(
    (state: RootState) => state.comment
  );
  const dispatch = useDispatch<AppDispatch>();

  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(getComments({ postId }));
  }, [dispatch, postId]);

  const handlePostComment = async () => {
    if (!content.trim()) return;

    try {
      dispatch(postComment({ content, postId })).unwrap();

      setContent(""); // Clear input
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {session && (
        <div className="mb-4 flex items-center gap-3">
          <Textarea
            rows={5}
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button onClick={handlePostComment} disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </Button>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border p-3 rounded-md">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-1/2 " />
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border p-3 rounded-md">
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-xs text-gray-500">
                - <span className="capitalize">{comment.author.name}</span> @
                {comment.author.username} |{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No comments yet. Be the first!</p>
      )}
    </div>
  );
}
