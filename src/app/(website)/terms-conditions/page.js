"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Terms() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    async function fetchPage() {
      try {
        const { data, error } = await supabase
          .from("pages")
          .select("title, content")
          .eq("slug", "terms-conditions")
          .single();

        setPage(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchPage();
  }, []);

  if (!page) return <p>الصفحة غير موجودة.</p>;

  return (
    <section className="my-10 md:my-20">
      <div className="container mx-auto px-4 ">
        <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
        <div
          className="px-2 space-y-4"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </section>
  );
}
