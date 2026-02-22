"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function PageContent() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPage() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("pages")
        .select("title, content")
        .eq("slug", slug)
        .single();

      if (error) {
        console.error(error);
        setError("تعذر تحميل الصفحة");
        setPage(null);
      } else {
        setPage(data);
      }

      setLoading(false);
    }

    if (slug) fetchPage();
  }, [slug]);

  if (loading) return <p>جارِ تحميل الصفحة...</p>;
  if (error) return <p>{error}</p>;
  if (!page) return <p>الصفحة غير موجودة.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">{page.title}</h1>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    </div>
  );
}
