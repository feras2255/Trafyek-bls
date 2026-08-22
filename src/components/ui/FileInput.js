"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function FileInput({
  setImage,
  initialImage,
  loading = false,
  label = "اختر صورة",
  accept = "image/*",
}) {
  const [preview, setPreview] = useState(initialImage || null);
  // نحتفظ بالـ object URL لإبطاله لاحقاً ومنع تسريب الذاكرة
  const objectUrlRef = useRef(null);

  useEffect(() => {
    if (initialImage && !objectUrlRef.current) setPreview(initialImage);
  }, [initialImage]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;

    setImage(file);
    setPreview(url);
  };

  // معاينة الملف المحلي blob: لا يمكن تمريرها لمحسّن الصور في Next
  const isLocalPreview = typeof preview === "string" && preview.startsWith("blob:");

  return (
    <div className="space-y-3">
      <label className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer inline-block hover:bg-green-700 transition-colors">
        {loading ? "جاري الرفع..." : label}
        <input
          type="file"
          accept={accept}
          onChange={handleChange}
          disabled={loading}
          className="hidden"
        />
      </label>

      {preview && (
        <Image
          src={preview}
          alt="معاينة الصورة"
          width={100}
          height={100}
          unoptimized={isLocalPreview}
          className="object-cover rounded border w-[100px] h-[100px]"
        />
      )}
    </div>
  );
}
