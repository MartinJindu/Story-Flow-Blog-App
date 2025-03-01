import NextAuth from "next-auth";
import { authOptions } from "@/lib/option";

//  Use named exports for GET & POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
