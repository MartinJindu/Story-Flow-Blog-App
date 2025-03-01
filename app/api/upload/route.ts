import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(_req: NextRequest) {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET!;

    // Generate signature
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, upload_preset: uploadPreset },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({ timestamp, signature, uploadPreset });
  } catch (_error) {
    return NextResponse.json(
      { error: "Signature generation failed" },
      { status: 500 }
    );
  }
}
