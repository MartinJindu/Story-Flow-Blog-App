export interface Post {
  id: string;
  title: string;
  slug: string;
  description?: string;
  postImage?: string;
  content?: string;
  createdAt: string;
  authorId?: string;
  author: { id?: string; name: string; username?: string };
  category: { name: string; slug?: string };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  post: [];
}
