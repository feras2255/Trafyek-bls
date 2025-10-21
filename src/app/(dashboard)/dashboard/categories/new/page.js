"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import FileInput from "@/components/ui/FileInput";
import RichTextEditor from "@/components/dashboard/rich-text-editor";

export default function NewCategory() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    long_description: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (eOrHtml, field) => {
    // التعامل مع RichTextEditor (الوصف الطويل)
    if (typeof eOrHtml === "string" && field === "long_description") {
      setFormData((prev) => ({
        ...prev,
        long_description: eOrHtml,
      }));
    }
    // التعامل مع الإدخالات العادية
    else if (eOrHtml?.target) {
      const { name, value } = eOrHtml.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";

    // رفع الصورة إلى Supabase Storage
    if (image) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("categories")
        .upload(filePath, image);

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("categories")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    // إدخال التصنيف الجديد
    const { error } = await supabase.from("categories").insert([
      {
        title: formData.title,
        description: formData.description,
        long_description: formData.long_description,
        image_url: imageUrl,
      },
    ]);

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      router.push("/dashboard/categories");
    }

    setLoading(false);
  };

  return (
    <div>
      <TitleWithBack
        title="إضافة تصنيف جديد"
        textBtn="رجوع"
        url="/dashboard/categories"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-card shadow rounded-md p-6 space-y-4"
      >
        <Input
          name="title"
          type="text"
          placeholder="عنوان التصنيف"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <Input
          name="description"
          type="text"
          placeholder="الوصف القصير"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block mb-1 text-sm text-secondarytext">
            الوصف التفصيلي
          </label>
          <RichTextEditor
            value={formData.long_description}
            onChange={(value) => handleChange(value, "long_description")}
          />
        </div>

        <FileInput setImage={setImage} />

        <Button
          title={loading ? "جارٍ الحفظ..." : "حفظ"}
          color="secondary"
          type="submit"
          size={"full"}
          disabled={loading}
        />
      </form>
    </div>
  );
}
