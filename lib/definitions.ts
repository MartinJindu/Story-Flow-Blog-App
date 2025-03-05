/**
 * Type Definitions for Story Flow
 */

export interface User {
  id: string;
  name: string;
  role: string;
  image: string | null;
  username: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  description: string;
  postImage?: string;
  featured: boolean;
  published: boolean;
  authorId: string;
  categoryId: string;
  category: { id: string; name: string; slug: string };
  author: { name: string; username?: string };
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  posts: Post[];
}

export interface FeaturedPosts {
  id: string;
  title: string;
  slug: string;
  postImage: string;
}

/**
 * Redux toolkit Slices definition
 */

// Post Slice
export interface PostState {
  posts: Post[];
  singlePost: Post | null;
  loading: boolean;
  error: string | null;
}

// Author Slice
interface Author {
  id: string;
  name: string;
  username: string;
  image?: string;
  bio?: string;
}

interface AuthorPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  category: { name: string };
  createdAt: string;
}

export interface AuthorState {
  author: Author | null;
  posts: AuthorPost[];
  totalPages: number;
  loading: boolean;
  error: string | null;
}

// Category Slice
export interface CategoryState {
  loading: boolean;
  categories: Category[];
  error: string | null;
}

// Category Slice
interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: { id: string; name: string; username: string; image?: string };
}

export interface CommentState {
  loading: boolean;
  comments: Comment[];
  error: string | null;
}

/**
 * Admin Section definitions
 */

// Admin Analytics
export interface AnalyticsData {
  totalUsers: number;
  totalPosts: number;
  totalComments: number;
  totalViews: number;
  mostPopularPosts: { id: string; title: string; views: number }[];
  mostActiveAuthors: {
    id: string;
    name: string;
    username: string;
    _count: { posts: number };
  }[];
}

// Admin Category
export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  posts: { id: string }[];
}

// Admin Comment
export interface AdminComment {
  id: string;
  content: string;
  post: { title: string };
  author: { name: string; email: string };
  createdAt: string;
}

// Admin Post
export interface AdminPost {
  id: string;
  title: string;
  featured: boolean;
  postImage: string;
  createdAt: string;
  author: { name: string };
}

// Admin User
export interface AdminUser {
  id: string;
  name: string;
  email: string;
  username: string;
  role: "ADMIN" | "USER";
}
