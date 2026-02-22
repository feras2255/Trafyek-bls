export const revalidate = 0;

import { supabase } from "@/lib/supabaseClient";
import Showcase from "@/components/showcase/Showcase";
import PageHero from "@/components/ui/PageHero";
import { getLocale } from "next-intl/server";

export default async function Projects() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  // جلب التصنيفات والمشاريع
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*");

  if (error || projectsError) {
    console.error("خطأ أثناء جلب المشاريع:", error || projectsError);
    return (
      <section className="py-20">
        <div className="container mx-auto text-center text-red-500 font-bold">
          {isAr
            ? "حدث خطأ أثناء تحميل المشاريع. يرجى المحاولة لاحقًا."
            : "An error occurred while loading projects. Please try again later."}
        </div>
      </section>
    );
  }

  // ترجمة البيانات بناءً على اللغة المختارة
  const localizedCategories = categories.map((cat) => ({
    ...cat,
    title: isAr ? cat.title_ar : cat.title_en,
  }));

  const localizedProjects = projects.map((proj) => ({
    ...proj,
    title: isAr ? proj.title_ar : proj.title_en,
    description: isAr ? proj.description_ar : proj.description_en,
  }));

  return (
    <main>
      {/* استخدام PageHero الموحد بدلاً من القسم اليدوي */}
      <PageHero
        title={isAr ? "معرض أعمالنا" : "Our Portfolio"}
        description={
          isAr
            ? "نُحوِّل الأفكار إلى إنجازات واقعية. نقدم حلولًا مبتكرة تعكس جودة عملنا واحترافيتنا في تحقيق رؤية عملائنا."
            : "We turn ideas into reality. Providing innovative solutions that reflect our quality and professionalism in achieving our clients' vision."
        }
        breadcrumb={[{ label: isAr ? "المشاريع" : "Projects" }]}
        bgImage="/co-hero.png"
      />

      <div className="py-10">
        <Showcase
          categories={localizedCategories}
          items={localizedProjects}
          type="projects"
        />
      </div>
    </main>
  );
}
