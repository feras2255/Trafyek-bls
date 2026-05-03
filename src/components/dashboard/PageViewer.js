"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Input from "../ui/input";
import Button from "../ui/button";
import MainTitle from "./MainTitle";
import { toast } from "sonner";
import Editor from "./Editor";

export default function PageViewer() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [formData, setFormData] = useState({
    title_ar: "",
    title_en: "",
    content_ar: "",
    content_en: "",
  });

  const handleChange = (eOrHtml, lang) => {
    // Input fields
    if (eOrHtml?.target) {
      const { name, value } = eOrHtml.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Rich text editor
    else {
      setFormData((prev) => ({
        ...prev,
        [lang]: eOrHtml,
      }));
    }
  };

  useEffect(() => {
    async function fetchPage() {
      if (!slug) return;

      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error(error);
        setPage(null);
        return;
      }

      setPage(data);

      setFormData({
        title_ar: data.title_ar || "",
        title_en: data.title_en || "",
        content_ar: data.content_ar || "",
        content_en: data.content_en || "",
      });
    }

    fetchPage();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("pages")
      .update({
        title_ar: formData.title_ar,
        title_en: formData.title_en,
        content_ar: formData.content_ar,
        content_en: formData.content_en,
        updated_at: new Date().toISOString(),
      })
      .eq("slug", slug);

    if (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء الحفظ");
      return;
    }

    toast.success("تم حفظ الصفحة بنجاح");
  };

  if (!page) return <p>الصفحة غير موجودة.</p>;

  const slugTitles = {
    "about-us": "من نحن",
    "privacy-policy": "سياسة الخصوصية",
    "terms-conditions": "الشروط والأحكام",
  };

  return (
    <div className="container mx-auto">
      <MainTitle title={slugTitles[slug] || page.title_ar} />

      <div className="rounded-lg my-8 bg-card p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Arabic Title */}
          <Input
            type="text"
            placeholder="العنوان بالعربية"
            name="title_ar"
            value={formData.title_ar}
            onChange={handleChange}
          />

          {/* English Title */}
          <Input
            type="text"
            placeholder="English Title"
            name="title_en"
            value={formData.title_en}
            onChange={handleChange}
          />

          {/* Arabic Content */}
          <div>
            <h3 className="mb-2 font-bold">المحتوى بالعربية</h3>
            <Editor
              data={formData.content_ar}
              onChange={(val) => handleChange(val, "content_ar")}
              isAr={true}
            />
          </div>

          {/* English Content */}
          <div>
            <h3 className="mb-2 font-bold">English Content</h3>
            <Editor
              data={formData.content_en}
              onChange={(val) => handleChange(val, "content_en")}
              isAr={false}
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white px-10 py-3 rounded-xl font-black text-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 cursor-pointer"
          >
            حفظ التغييرات
          </button>
        </form>
      </div>
    </div>
  );
}
