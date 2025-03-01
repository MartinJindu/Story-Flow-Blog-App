import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sendResetEmail(email: string, token: string) {
  const resetUrl = `http://localhost:3000/reset-password/${token}`;

  console.log(` Password reset link for ${email}: ${resetUrl}`);

  return true; // Simulate a successful email send
}

/* to clear resetToken periodically */

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export async function cleanupExpiredTokens() {
//   await prisma.user.updateMany({
//     where: { resetTokenExpiry: { lte: new Date() } },
//     data: { resetToken: null, resetTokenExpiry: null },
//   });

//   console.log(" Expired reset tokens cleaned up!");
// }
