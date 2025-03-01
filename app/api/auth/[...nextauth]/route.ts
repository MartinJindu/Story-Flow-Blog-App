import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

interface User {
  id: string;
  name: string;
  role: string;
  image: string | null;
  username: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        // Verify password
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id as string;
        token.name = user.name as string;
        token.role = user.role as string;
        token.image = user.image;
        token.username = user.username as string;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user = {
          id: token.id as string, //  user ID
          name: token.name as string,
          role: token.role as string,
          image: token.image,
          username: token.username,
        };
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
};

//  Use named exports for GET & POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
