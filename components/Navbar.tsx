"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../public/blog.webp";
import { Category } from "@/lib/definitions";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getCategory } from "@/StoreSlices/Category/categorySlice";
import { toast } from "sonner";

export default function Navbar() {
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { data: session } = useSession();

  // Fetch categories from the database
  useEffect(() => {
    dispatch(getCategory());
  }, []);

  // Function to close menu after navigating
  const handleNavClick = () => {
    setTimeout(() => {
      setIsOpen(false);
      setCategoryDropdown(false);
      setProfileDropdown(false);
    }, 150);
  };

  const DefaultAvatar = ({ username }: { username: string }) => (
    <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-gray-700 font-bold text-2xl">
      {username[0]}
    </div>
  );

  return (
    <nav className="bg-gray-900 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/create" className="hover:text-gray-300">
            Create Post
          </Link>
          <Link href="/posts" className="hover:text-gray-300">
            Posts
          </Link>

          {/* Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdown(!categoryDropdown)}
              className="hover:text-gray-300 focus:outline-none flex items-center "
            >
              Categories{" "}
              {categoryDropdown ? (
                <IoMdArrowDropup className="ml-1 size-5" />
              ) : (
                <IoMdArrowDropdown className="ml-1 size-5" />
              )}
            </button>
            {categoryDropdown && (
              <div className="absolute bg-gray-800 text-white mt-2 rounded shadow-lg w-40 z-10">
                {categories.map((category: Category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    onClick={handleNavClick}
                    className="block px-4 py-2 hover:bg-gray-700"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {session ? (
            <div className="relative">
              {/* User Image & Dropdown */}
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="focus:outline-none flex items-center space-x-2"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="User"
                    width={30}
                    height={30}
                    className="w-10 h-10 rounded-full border-2 border-gray-500 hover:border-white transition"
                  />
                ) : (
                  <DefaultAvatar username={session.user.name} />
                )}

                {profileDropdown ? (
                  <IoMdArrowDropup className="ml-1 size-5" />
                ) : (
                  <IoMdArrowDropdown className="ml-1 size-5" />
                )}
              </button>

              {profileDropdown && (
                <div className="absolute right-0 bg-gray-800 text-white mt-2 rounded shadow-lg w-40 z-10">
                  <Link
                    href={`/author/${session.user.username}`}
                    className="block px-4 py-2 hover:bg-gray-700"
                    onClick={handleNavClick}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={async () => {
                      await signOut();
                      toast.success("Logged out");
                      setProfileDropdown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link href="/signup" className="hover:text-gray-300">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 mt-2 rounded-lg py-2 text-center">
          <Link
            href="/create"
            className="block py-2 hover:text-gray-300"
            onClick={handleNavClick}
          >
            Create Post
          </Link>
          <Link
            href="/posts"
            className="block py-2 hover:text-gray-300"
            onClick={handleNavClick}
          >
            Posts
          </Link>

          {/* Mobile Categories Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCategoryDropdown(!categoryDropdown)}
              className="flex justify-center items-center w-full py-2 hover:text-gray-300"
            >
              Categories{" "}
              {categoryDropdown ? (
                <IoMdArrowDropup className=" size-5" />
              ) : (
                <IoMdArrowDropdown className=" size-5" />
              )}
            </button>
            {categoryDropdown && (
              <div className=" flex flex-col justify-center items-center bg-gray-900 text-white mt-1 rounded-lg text-left px-4">
                {categories.map((category: Category) => (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="block py-2 hover:bg-gray-700"
                    onClick={handleNavClick}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {session ? (
            <div className="mt-2 flex flex-col items-center">
              {session.user.image ? (
                <Image
                  src={session.user?.image}
                  alt="User"
                  width={40}
                  height={40}
                  className="w-16 h-16 rounded-full border-2 border-gray-500 hover:border-white transition"
                />
              ) : (
                <DefaultAvatar username={session.user.name} />
              )}
              <Link
                href={`/author/${session.user.username}`}
                className="block py-2 hover:text-gray-300"
                onClick={handleNavClick}
              >
                Profile
              </Link>
              <button
                onClick={async () => {
                  await signOut();
                  toast.success("Logged out");
                  setIsOpen(false);
                }}
                className="block py-2 hover:text-gray-300 w-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="block py-2 hover:text-gray-300"
                onClick={handleNavClick}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block py-2 hover:text-gray-300"
                onClick={handleNavClick}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
