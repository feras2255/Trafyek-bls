"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Input from "../ui/input";
import RichTextEditor from "./rich-text-editor";
import Button from "../ui/button";
import MainTitle from "./MainTitle";
import { toast } from "sonner";

export default function PageViewer() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (eOrHtml) => {
    // if it's input or textarea
    if (eOrHtml?.target) {
      const { name, value } = eOrHtml.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // if it's RichTextEditor
    else {
      setFormData((prev) => ({
        ...prev,
        content: eOrHtml,
      }));
    }
  };

  useEffect(() => {
    async function fetchPage() {
      if (!slug) return;

      try {
        const { data, error } = await supabase
          .from("pages")
          .select("title, content")
          .eq("slug", slug)
          .single();

        if (error) throw error;
        setPage(data);
        if (data) {
          setFormData({
            title: data.title,
            content: data.content,
          });
        }
      } catch (err) {
        console.error(err);

        setPage(null);
      }
    }

    fetchPage();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("pages")
        .update({
          title: formData.title,
          content: formData.content,
          updated_at: new Date(),
        })
        .eq("slug", slug);

      if (error) throw error;
      toast("تم حفظ الصفحة بنجاح ");
    } catch (err) {
      console.error(err);
      toast("حدث خطأ أثناء الحفظ ");
    }
  };

  if (!page) return <p>الصفحة غير موجودة.</p>;

  const slugTitles = {
    "about-us": "من نحن",
    "privacy-policy": "سياسة الاستخدام والخصوصية",
    "terms-conditions": "الشروط والأحكام",
  };
  return (
    <div className="container mx-auto">
      <MainTitle title={slugTitles[slug] || formData.title} />
      <div className="rounded-lg my-8 bg-card p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="عنوان الصفحة"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <RichTextEditor value={formData.content} onChange={handleChange} />
          <Button type="submit" title="حفظ" color="primary" />
        </form>
      </div>
    </div>
  );
}
