import { Skeleton } from "@/components/ui/skeleton";

export default function CreatePostSkeleton() {
  return (
    <div className="max-w-2xl xl:max-w-5xl mx-auto p-4 animate-pulse">
      {/* Title */}
      <Skeleton className="w-48 h-6 bg-gray-300 mb-4" />

      <form className="space-y-4">
        {/* Title Input */}
        <div>
          <Skeleton className="w-20 h-5 bg-gray-300 mb-2" />
          <Skeleton className="w-full h-10 bg-gray-300 rounded-md" />
        </div>

        {/* Category Select */}
        <div>
          <Skeleton className="w-40 h-5 bg-gray-300 mb-2" />
          <Skeleton className="w-full h-10 bg-gray-300 rounded-md" />
        </div>

        {/* Post Image Upload */}
        <div>
          <Skeleton className="w-32 h-5 bg-gray-300 mb-2" />
          <Skeleton className="w-full h-10 bg-gray-300 rounded-md" />
          <Skeleton className="w-full h-40 bg-gray-300 rounded-md mt-2" />
        </div>

        {/* Description */}
        <div>
          <Skeleton className="w-32 h-5 bg-gray-300 mb-2" />
          <Skeleton className="w-full h-10 bg-gray-300 rounded-md" />
        </div>

        {/* Content Editor */}
        <div>
          <Skeleton className="w-40 h-5 bg-gray-300 mb-2" />
          <Skeleton className="w-full h-40 bg-gray-300 rounded-md" />
        </div>

        {/* Save as Draft Checkbox */}
        <div className="flex items-center gap-2">
          <Skeleton className="w-5 h-5 bg-gray-300 rounded-md" />
          <Skeleton className="w-24 h-5 bg-gray-300" />
        </div>

        {/* Submit Button */}
        <Skeleton className="w-32 h-10 bg-gray-300 rounded-md" />
      </form>
    </div>
  );
}
