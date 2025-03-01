import { Skeleton } from "@/components/ui/skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function FeaturedPostSkeleton() {
  return (
    <section className="mt-8 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-5 text-gray-400">
        Featured Articles
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full bg-gray-900"
      >
        {[1, 2, 3].map((index) => (
          <SwiperSlide key={index} className="p-2 pb-14">
            <div className="relative w-full h-64 overflow-hidden transition duration-900 animate-pulse">
              <Skeleton className="w-full h-full bg-gray-700 rounded-md" />
            </div>
            <Skeleton className="mt-2 w-3/4 h-6 bg-gray-700 mx-auto rounded-md" />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
