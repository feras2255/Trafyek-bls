export const revalidate = 0;

import PageHero from "@/components/ui/PageHero";
import { supabase } from "@/lib/supabaseClient";

export default async function About() {
  const { data: page, error } = await supabase
    .from("pages")
    .select("title, content")
    .eq("slug", "about-us")
    .single();

  if (!page) return <p>الصفحة غير موجودة.</p>;
  const breadcrumbData = [{ label: "من نحن" }];

  return (
    <section className="">
      <PageHero
        title="ترافيك.. حيث يلتقي الشغف بالابتكار"
        description="نحن لسنا مجرد وكالة رقمية، نحن شركاؤك في رحلة النجاح، نكرس خبراتنا التقنية والإبداعية لنصنع لعلامتك التجارية حضوراً لا يُنسى."
        breadcrumb={breadcrumbData}
        bgImage="/ab-hero.png"
      />
      <div className="container mx-auto px-4 mt-20 ">
        <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
        <div
          className="px-3 space-y-4"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </section>
  );
}
