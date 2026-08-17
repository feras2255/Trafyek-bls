// CMS pages change rarely; re-fetch hourly instead of on every request.
export const revalidate = 3600;

import { getPageContent } from "@/lib/pages";
import { supabase } from "@/lib/supabaseClient";
import { getLocale } from "next-intl/server";
import { buildMetadata } from "@/lib/seo";

async function getPage(slug) {
  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";
  const page = await getPage(slug);

  if (!page) {
    return {
      title: isAr ? "الصفحة غير موجودة" : "Page not found",
      robots: { index: false, follow: true },
    };
  }

  const { title, content } = getPageContent(page, isAr);

  return buildMetadata({
    locale,
    path: `/pages/${slug}`,
    title,
    description: content
      ?.replace(/<[^>]*>?/gm, "")
      ?.trim()
      ?.slice(0, 160),
  });
}

export default async function CmsPage({ params }) {
  const { slug } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";

  // Was hardcoded to .eq("slug", "privacy-policy") and ignored the route
  // param, so /pages/terms-conditions served the privacy policy and the terms
  // page was unreachable.
  const page = await getPage(slug);

  if (!page)
    return (
      <p className="text-center py-20">
        {isAr ? "الصفحة غير موجودة." : "Page not found."}
      </p>
    );

  const { title, content } = getPageContent(page, isAr);

  return (
    <section className="my-24 md:my-32" dir={isAr ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Title */}
        <h1 className="text-4xl font-black mb-6 text-accent">{title}</h1>

        {/* Content */}
        <div
          className="prose max-w-none prose-p:leading-loose prose-headings:font-black"
          style={{
            textAlign: isAr ? "right" : "left",
          }}
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />
      </div>
    </section>
  );
}
