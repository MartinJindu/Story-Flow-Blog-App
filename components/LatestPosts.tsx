import PostCard from "./PostCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import { fetchAllPost } from "@/StoreSlices/Post/postSlice";
import LatestPostsSkeleton from "./skeleton/LatestPostsSkeleton";
import { Button } from "./ui/button";
import Link from "next/link";

const LatestPosts = () => {
  const { posts, loading } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllPost());
  }, []);

  if (loading) return <LatestPostsSkeleton title="Latest Posts" />;

  return (
    <section className="mt-6 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Latest Posts
      </h2>

      <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mx-auto">
        {posts.slice(0, 6).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="flex mt-6 justify-center">
        <Link href={"/posts"} className="w-full">
          <Button className="w-full p-7 rounded-none cursor-pointer">
            All Posts
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default LatestPosts;
