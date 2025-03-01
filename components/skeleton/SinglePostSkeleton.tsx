import { Skeleton } from "../ui/skeleton";

export default function SinglePostSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Skeleton className="w-full h-64 md:h-96 rounded-lg mb-4" />
      <Skeleton className="w-32 h-6 mb-2" />
      <Skeleton className="h-8 w-3/4 mb-2" />
      <Skeleton className="h-5 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-5/6 mb-2" />
    </div>
  );
}
