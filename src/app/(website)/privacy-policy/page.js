"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Privacy() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    async function fetchPage() {
      try {
        const { data, error } = await supabase
          .from("pages")
          .select("title, content")
          .eq("slug", "privacy-policy")
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
    <section className="my-10">
      <div className="container mx-auto px-4 py-10 text-center lg:text-start">
        <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </section>
  );
}
