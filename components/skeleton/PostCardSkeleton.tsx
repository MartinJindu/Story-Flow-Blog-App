import { Skeleton } from "@/components/ui/skeleton";

export default function PostCardSkeleton() {
  return (
    <div className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition duration-900 animate-pulse">
      {/* Image Skeleton */}
      <div className="h-52 w-full overflow-hidden">
        <Skeleton className="w-full h-full bg-gray-300" />
      </div>

      {/* Content Skeleton */}
      <div className="p-4 flex flex-col">
        {/* Category Badge */}
        <Skeleton className="w-20 h-5 bg-gray-300 rounded-full" />

        {/* Title */}
        <Skeleton className="w-3/4 h-6 bg-gray-300 rounded-md mt-3" />
        <Skeleton className="w-2/4 h-6 bg-gray-300 rounded-md mt-2" />

        {/* Metadata (Author & Date) */}
        <div className="flex gap-2 mt-2">
          <Skeleton className="w-16 h-4 bg-gray-300 rounded-md" />
          <Skeleton className="w-20 h-4 bg-gray-300 rounded-md" />
        </div>

        {/* Description */}
        <Skeleton className="w-full h-4 bg-gray-300 rounded-md mt-3" />
        <Skeleton className="w-full h-4 bg-gray-300 rounded-md mt-2" />
        <Skeleton className="w-3/4 h-4 bg-gray-300 rounded-md mt-2" />

        {/* Read More Button */}
        <Skeleton className="w-24 h-5 bg-gray-300 rounded-md mt-4" />
      </div>
    </div>
  );
}
