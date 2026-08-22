"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { supabase } from "@/lib/supabaseClient";
import { getPageContent } from "@/lib/pages";

export default function PageContent() {
  const { slug } = useParams();
  const locale = useLocale();
  const isAr = locale === "ar";

  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchPage() {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("pages")
        .select("title_ar, title_en, content_ar, content_en")
        .eq("slug", slug)
        .maybeSingle();

      if (fetchError) {
        console.error(fetchError);
        setError("تعذر تحميل الصفحة");
        setPage(null);
      } else {
        setPage(data);
      }

      setLoading(false);
    }

    fetchPage();
  }, [slug]);

  if (loading) return <p>جارِ تحميل الصفحة...</p>;
  if (error) return <p>{error}</p>;
  if (!page) return <p>الصفحة غير موجودة.</p>;

  const { title, content } = getPageContent(page, isAr);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
