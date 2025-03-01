import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      role: string;
      image: string | null;
      username: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name: string;
    role: string;
    image: string | null;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    role: string;
    image: string | null;
    username: string;
  }
}
