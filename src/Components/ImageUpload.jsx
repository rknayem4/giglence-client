"use client";

import { useState } from "react";

export default function ImageUpload({ setImageUri }) {
  const [image, setImage] = useState(null);

  const [url, setUrl] = useState("");

  const uploadImage = async () => {
    const formData = new FormData();

    formData.append("file", image);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    setUrl(data.url);
    setImageUri(data.uri);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        type="button"
        onClick={uploadImage}
        className="rounded-lg bg-[#3B82F6] px-4 py-2 text-white"
      >
        Upload Image
      </button>

      {url && (
        <img
          src={url}
          alt="uploaded"
          className="mt-5 h-40 w-40 object-cover rounded-xl"
        />
      )}
    </div>
  );
}
