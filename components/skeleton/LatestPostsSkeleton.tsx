import PostCardSkeleton from "./PostCardSkeleton";

const LatestPostsSkeleton = ({ title }: { title: string }) => {
  return (
    <section className="mt-6 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-center">{title}</h2>

      {/* Show 6 loading skeletons */}
      <div className="container max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5 mx-auto">
        {[...Array(6)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
};

export default LatestPostsSkeleton;
