export const revalidate = 0;

import { getPageContent } from "@/lib/pages";
import { supabase } from "@/lib/supabaseClient";
import { getLocale } from "next-intl/server";

export default async function Privacy() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", "privacy-policy")
    .single();

  console.log(page);

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
