import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import crypto from "crypto";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Generate signature for cloudinary delete and update images
export function generateSignature(publicId: string) {
  const timestamp = Math.floor(Date.now() / 1000);
  const apiSecret = process.env.CLOUDINARY_API_SECRET!;

  const signatureString = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  return crypto.createHash("sha256").update(signatureString).digest("hex");
}

// To delete image on cloudinary
export async function deleteImageOnCloudinary(image: string) {
  try {
    // Extract public_id from Cloudinary URL
    const publicId = image.split("/").pop()?.split(".")[0]; // Extract public_id
    await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      new URLSearchParams({
        public_id: publicId!,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
        timestamp: String(Math.floor(Date.now() / 1000)),
        signature: generateSignature(publicId!), // Generates a signature
      })
    );
  } catch (error) {
    throw new Error("Failed to delete image from Cloudinary");
  }
}

// export async function sendResetEmail(email: string, token: string) {
//   const resetUrl = `http://localhost:3000/reset-password/${token}`;

//   console.log(` Password reset link for ${email}: ${resetUrl}`);

//   return true; // Simulate a successful email send
// }
