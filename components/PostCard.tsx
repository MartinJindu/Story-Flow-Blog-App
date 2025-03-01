import { Post } from "@/lib/definitions";
import Link from "next/link";
import defaultPostImage from "@/public/default_post_image.webp";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div className="bg-white  shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
      {/* post Image */}
      <div className="h-52 w-full overflow-hidden">
        {post.postImage ? (
          <img
            src={post.postImage} // Default image if none provided
            alt={post.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={defaultPostImage}
            alt="default"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* post Content */}
      <div className="p-4 flex flex-col">
        {/* Category Badge */}
        <Link href={`/category/${post.category.slug}`}>
          <span className="bg-violet-100 text-violet-600 px-3 py-1 text-xs font-semibold  self-start">
            {post.category?.name}
          </span>
        </Link>

        {/* Title */}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-lg font-bold mt-2 capitalize line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Metadata: Author & Date */}
        <p className="text-sm text-gray-500 mt-1">
          By{" "}
          <Link href={`/author/${post.author?.username}`}>
            <span className="font-medium text-gray-700 capitalize">
              {post.author?.name}
            </span>
          </Link>{" "}
          •{" "}
          {formatDistanceToNow(new Date(post.createdAt), {
            addSuffix: true,
          })}
        </p>

        {/* post Description */}
        <p className="text-gray-700 text-sm mt-2 line-clamp-3">
          {post.description}
        </p>

        {/* Read More Button */}
        <Link
          href={`/posts/${post.slug}`}
          className="mt-3 text-violet-600 font-medium hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
