"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import logo from "../public/blog.webp";
import { AppDispatch, RootState } from "@/store";
import { getCategory } from "@/StoreSlices/Category/categorySlice";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch<AppDispatch>();
  const [categoryDropdown, setCategoryDropdown] = useState(false);

  // Fetch categories from the database
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="container mx-auto px-6 md:px-12 grid gap-8 text-center md:text-left md:grid-cols-3">
        {/* Left Section */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="Story Flow Logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold">Story Flow</span>
          </Link>
          <p className="text-sm mt-2">
            Your go-to platform for insightful stories, articles, and blogs.
          </p>
        </div>

        {/* Center Section - Quick Links */}
        <div className="">
          <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
          <nav className="space-y-2 flex flex-col items-center md:items-start">
            <Link href="/posts" className="hover:text-white">
              Posts
            </Link>

            {/* Categories Dropdown */}
            <div className="relative justify-center items-center">
              <button
                onClick={() => setCategoryDropdown(!categoryDropdown)}
                className="flex items-center gap-1 hover:text-white"
              >
                Categories{" "}
                {categoryDropdown ? (
                  <IoMdArrowDropup size={18} />
                ) : (
                  <IoMdArrowDropdown size={18} />
                )}
              </button>
              <AnimatePresence>
                {categoryDropdown && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute left-0 bg-gray-800 text-white mt-2 rounded shadow-lg w-40 z-10"
                  >
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="block px-4 py-2 hover:bg-gray-700"
                        onClick={() => setCategoryDropdown(false)}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </nav>
        </div>

        {/* Right Section - Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="hover:text-white">
              <FaFacebook size={24} />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center border-t border-gray-700 mt-6 pt-4 text-sm">
        © {new Date().getFullYear()} Story Flow. All rights reserved.
      </div>
    </footer>
  );
}
