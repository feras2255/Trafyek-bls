"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Input from "../ui/input";
import MainTitle from "./MainTitle";
import { toast } from "sonner";
import Editor from "./Editor";

const SLUG_TITLES = {
  "about-us": "من نحن",
  "privacy-policy": "سياسة الخصوصية",
  "terms-conditions": "الشروط والأحكام",
};

export default function PageViewer() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [fetching, setFetching] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title_ar: "",
    title_en: "",
    content_ar: "",
    content_en: "",
  });

  const handleChange = (eOrHtml, lang) => {
    if (eOrHtml?.target) {
      const { name, value } = eOrHtml.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      return;
    }
    setFormData((prev) => ({ ...prev, [lang]: eOrHtml }));
  };

  useEffect(() => {
    if (!slug) return;

    async function fetchPage() {
      const { data, error } = await supabase
        .from("pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        console.error(error);
        toast.error("تعذّر تحميل الصفحة");
      }

      setPage(data || null);
      if (data) {
        setFormData({
          title_ar: data.title_ar || "",
          title_en: data.title_en || "",
          content_ar: data.content_ar || "",
          content_en: data.content_en || "",
        });
      }
      setFetching(false);
    }

    fetchPage();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    setSaving(true);

    // upsert حتى نتمكن من إنشاء الصفحة إن لم تكن موجودة بعد
    const { data, error } = await supabase
      .from("pages")
      .upsert(
        {
          slug,
          title_ar: formData.title_ar,
          title_en: formData.title_en,
          content_ar: formData.content_ar,
          content_en: formData.content_en,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slug" },
      )
      .select()
      .single();

    setSaving(false);

    if (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء الحفظ");
      return;
    }

    setPage(data);
    toast.success("تم حفظ الصفحة بنجاح");
  };

  if (fetching) {
    return (
      <div className="container mx-auto space-y-4 animate-pulse mt-8">
        <div className="h-10 w-64 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-64 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <MainTitle title={SLUG_TITLES[slug] || page?.title_ar || slug} />

      {!page && (
        <p className="mt-6 text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-4">
          هذه الصفحة غير موجودة في قاعدة البيانات بعد، وسيتم إنشاؤها عند الحفظ.
        </p>
      )}

      <div className="rounded-lg my-8 bg-card p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            placeholder="العنوان بالعربية"
            name="title_ar"
            value={formData.title_ar}
            onChange={handleChange}
            required
          />

          <Input
            type="text"
            placeholder="English Title"
            name="title_en"
            value={formData.title_en}
            onChange={handleChange}
          />

          <div>
            <h3 className="mb-2 font-bold">المحتوى بالعربية</h3>
            <Editor
              data={formData.content_ar}
              onChange={(val) => handleChange(val, "content_ar")}
              isAr
            />
          </div>

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
            disabled={saving}
            aria-label="حفظ التغييرات"
            className="bg-primary text-white px-10 py-3 rounded-xl font-black text-lg hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/20 cursor-pointer"
          >
            {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>
        </form>
      </div>
    </div>
  );
}
