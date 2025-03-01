import { Skeleton } from "@/components/ui/skeleton";

export default function AuthorSkeleton() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Author Info Skeleton */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md md:col-span-1">
          <div className="text-center">
            <Skeleton className="h-24 w-24 rounded-full mx-auto" />
            <Skeleton className="h-6 w-32 mx-auto mt-4" />
            <Skeleton className="h-4 w-24 mx-auto mt-2" />
          </div>
          <Skeleton className="h-12 w-full mt-4" />
          <Skeleton className="h-10 w-24 mx-auto mt-4" />
        </div>

        {/* Right: Author's Posts Skeleton */}
        <div className="md:col-span-2">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-4 rounded-lg shadow-md">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
