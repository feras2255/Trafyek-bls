"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import FileInput from "@/components/ui/FileInput";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import Input from "@/components/ui/input";
import { toast } from "sonner";
import RichTextEditor from "@/components/dashboard/rich-text-editor";

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    long_description: "",
    image_url: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(null);

  const handleChange = (eOrHtml, field) => {
    // التعامل مع الإدخالات العادية
    if (eOrHtml?.target) {
      const { name, value } = eOrHtml.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // التعامل مع RichTextEditor (الوصف الطويل)
    else if (typeof eOrHtml === "string" && field === "long_description") {
      setFormData((prev) => ({
        ...prev,
        long_description: eOrHtml,
      }));
    }
  };

  // جلب بيانات التصنيف الحالي
  useEffect(() => {
    if (!id) return;
    const fetchCategory = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        toast("حدث خطأ أثناء جلب بيانات التصنيف");
        return;
      }

      setCategory(data);
      setFormData({
        title: data.title ?? "",
        description: data.description ?? "",
        long_description: data.long_description ?? "",
        image_url: data.image_url ?? "",
      });
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = formData.image_url || "";

    // رفع الصورة إذا تم تغييرها
    if (image) {
      try {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from("categories")
          .upload(filePath, image, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("categories")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      } catch (err) {
        console.error("Upload error:", err);
        toast("فشل تحميل الصورة.");
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase
      .from("categories")
      .update({
        title: formData.title,
        description: formData.description,
        long_description: formData.long_description,
        image_url: imageUrl,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      console.error(error);
      toast("فشل تحديث التصنيف.");
    } else {
      toast("تم تحديث التصنيف بنجاح ✅");
      router.push("/dashboard/categories");
    }
  };

  if (!category)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        جاري تحميل بيانات التصنيف...
      </div>
    );

  return (
    <div className="p-6">
      <TitleWithBack
        title="تحديث التصنيف"
        textBtn="رجوع"
        url="/dashboard/categories"
      />

      <form
        onSubmit={handleSubmit}
        className="bg-card shadow rounded p-6 space-y-4"
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

        <FileInput setImage={setImage} initialImage={category?.image_url} />

        <div>
          <button
            type="submit"
            className="bg-secondary text-white w-full px-4 py-2 rounded cursor-pointer"
            disabled={loading}
          >
            {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>
        </div>
      </form>
    </div>
  );
}
