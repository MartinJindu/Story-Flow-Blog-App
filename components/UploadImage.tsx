"use client";

import { useState } from "react";
import axios from "axios";

export default function UploadImage({
  setImageUrl,
}: {
  setImageUrl: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      // Fetch signed upload parameters from backend
      const { data } = await axios.get("/api/upload");
      const { timestamp, signature, uploadPreset } = data;

      // create form data for cloudinary upload
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);
      formData.append("timestamp", timestamp);
      formData.append("signature", signature);
      formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);

      // upload the image to cloudinary
      const uploadResponse = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      setImageUrl(uploadResponse.data.secure_url);
    } catch (error) {
      setError("Image upload failed. Please try again");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="cursor-pointer border rounded p-2"
      />
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
