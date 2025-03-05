"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FeaturedPosts } from "@/lib/definitions";
import FeaturedPostSkeleton from "./skeleton/FeaturedPostSkeleton";
import defaultPostImage from "@/public/default_post_image.webp";

const FeaturedPost = () => {
  const [featuredPosts, setFeaturedPosts] = useState<FeaturedPosts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeaturedPosts() {
      try {
        const { data } = await axios.get("/api/posts/featured");
        setFeaturedPosts(data);
      } catch (error) {
        console.error("Error fetching featured posts:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedPosts();
  }, []);

  if (loading) return <FeaturedPostSkeleton />;
  if (featuredPosts.length === 0) return null; // Don't render if no featured posts

  return (
    <section className=" mt-8 max-w-7xl mx-auto">
      <h2 className="text-3xl  font-bold text-center mb-5">Featured Post</h2>

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
        {featuredPosts.map((post) => (
          <SwiperSlide key={post.id} className="p-2 pb-14 ">
            <Link href={`/posts/${post.slug}`}>
              <div className="relative w-full h-64 overflow-hidden">
                {post.postImage ? (
                  <Image
                    src={post.postImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Image
                    src={defaultPostImage}
                    alt="default"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h3 className="mt-2 text-lg text-white font-bold text-center">
                {post.title}
              </h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedPost;
