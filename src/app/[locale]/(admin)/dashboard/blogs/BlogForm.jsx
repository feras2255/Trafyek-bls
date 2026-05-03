"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useTranslations } from "next-intl";
import Input from "@/components/ui/input";
import FileInput from "@/components/ui/FileInput";
import Editor from "@/components/dashboard/Editor";

export default function BlogForm({ initialData = null, isAr }) {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(
    initialData || {
      title_ar: "",
      title_en: "",
      description_ar: "",
      description_en: "",
      category_ar: "",
      category_en: "",
      image_url: "",
    },
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let finalImageUrl = formData.image_url;

    // upload image
    if (formData.image_file) {
      const file = formData.image_file;
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("blogs")
        .upload(filePath, file);

      if (uploadError) {
        alert("Error uploading image: " + uploadError.message);
        setLoading(false);
        return;
      }

      // get public url of uploaded image
      const {
        data: { publicUrl },
      } = supabase.storage.from("blogs").getPublicUrl(filePath);

      finalImageUrl = publicUrl;
    }

    // proceed with form submission
    const { image_file, ...dataToSave } = formData;
    const payload = { ...dataToSave, image_url: finalImageUrl };

    // add or update
    const { error } = initialData
      ? await supabase.from("blogs").update(payload).eq("id", initialData.id)
      : await supabase.from("blogs").insert([payload]);

    if (!error) {
      router.push(isAr ? "/ar/dashboard/blogs" : "/en/dashboard/blogs");
      router.refresh();
    } else {
      alert(isAr ? "حدث خطأ: " + error.message : "Error: " + error.message);
    }
    setLoading(false);
  };
  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="shadow-sm space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          placeholder={t("title_ar")}
          value={formData.title_ar || ""}
          onChange={(e) => handleFieldChange("title_ar", e.target.value)}
          required
        />

        <Input
          placeholder={t("title_en")}
          value={formData.title_en || ""}
          onChange={(e) => handleFieldChange("title_en", e.target.value)}
          required
        />
      </div>

      {/* category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          placeholder={t("category_ar")}
          value={formData.category_ar || ""}
          onChange={(e) => handleFieldChange("category_ar", e.target.value)}
          required
        />
        <Input
          placeholder={t("category_en")}
          value={formData.category_en || ""}
          onChange={(e) => handleFieldChange("category_en", e.target.value)}
          required
        />
      </div>

      {/* description */}
      <div>
        <h4 className="block text-lg font-bold mb-4 text-maintext">
          {t("description_ar")}
        </h4>

        <Editor
          data={formData.description_ar}
          onChange={(content) => handleFieldChange("description_ar", content)}
          isAr={true}
        />
      </div>
      <div>
        <h4 className="block text-lg font-bold mb-4 text-maintext">
          {t("description_en")}
        </h4>

        <Editor
          data={formData.description_en}
          onChange={(content) => handleFieldChange("description_en", content)}
          isAr={false}
        />
      </div>

      <FileInput
        setImage={(file) => handleFieldChange("image_file", file)}
        initialImage={formData.image_url}
      />

      <button
        type="submit"
        disabled={loading}
        aria-label="حفظ المقال"
        className="w-full bg-primary text-white py-4 rounded-xl hover:bg-hover transition-all font-bold shadow-lg shadow-primary/20 active:scale-[0.98] cursor-pointer"
      >
        {loading
          ? isAr
            ? "جاري الحفظ..."
            : "Saving..."
          : isAr
            ? "حفظ المقال"
            : "Save Blog"}
      </button>
    </form>
  );
}
