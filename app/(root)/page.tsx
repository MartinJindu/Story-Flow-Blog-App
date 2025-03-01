"use client";

import HeroSection from "@/components/HeroSection";

import LatestPosts from "@/components/LatestPosts";

import FeaturedPost from "@/components/FeaturedPost";

export default function Home() {
  return (
    <>
      <HeroSection />

      <FeaturedPost />

      <LatestPosts />
    </>
  );
}
