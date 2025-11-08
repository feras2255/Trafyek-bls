import { supabase } from "@/lib/supabaseClient";

export default async function About() {
  const { data: page, error } = await supabase
    .from("pages")
    .select("title, content")
    .eq("slug", "about-us")
    .single();

  if (!page) return <p>الصفحة غير موجودة.</p>;

  return (
    <section className="my-24 md:my-32">
      <div className="container mx-auto px-4  ">
        <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
        <div
          className="px-3 space-y-4"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </section>
  );
}
