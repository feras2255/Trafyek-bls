"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function FileInput({ setImage, initialImage }) {
  const [preview, setPreview] = useState(initialImage || null);

  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
    }
  }, [initialImage]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-3">
      {/* زر رفع */}
      <label className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer inline-block">
        اختر صورة
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {/* معاينة */}
      {preview && (
        <Image
          src={preview}
          alt="preview"
          width={100}
          height={100}
          className="object-cover rounded border"
        />
      )}
    </div>
  );
}
