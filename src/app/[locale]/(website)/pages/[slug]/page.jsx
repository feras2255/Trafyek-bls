export const revalidate = 0;

import { getPageContent } from "@/lib/pages";
import { supabase } from "@/lib/supabaseClient";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";

  const { data: page } = await supabase
    .from("pages")
    .select("title_ar, title_en, content_ar, content_en")
    .eq("slug", slug)
    .maybeSingle();

  if (!page) return { title: isAr ? "الصفحة غير موجودة" : "Page not found" };

  const { title, content } = getPageContent(page, isAr);

  return {
    title,
    description: content?.replace(/<[^>]*>?/gm, "").substring(0, 160),
    alternates: {
      canonical: `https://www.trafyekbls.com/${locale}/pages/${slug}`,
    },
  };
}

export default async function StaticPage({ params }) {
  const { slug } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";

  const { data: page, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) console.error("Error loading page:", slug, error);
  if (!page) notFound();

  const { title, content } = getPageContent(page, isAr);

  return (
    <section className="my-24 md:my-32" dir={isAr ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-black mb-6 text-accent">{title}</h1>

        <div
          className="prose max-w-none prose-p:leading-loose prose-headings:font-black"
          style={{ textAlign: isAr ? "right" : "left" }}
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />
      </div>
    </section>
  );
}
