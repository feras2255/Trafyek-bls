import { supabase } from "@/lib/supabaseClient";
import Showcase from "@/components/showcase/Showcase";
import { getLocale, getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";
import { localized } from "@/lib/localized";

export default async function OurWork() {
  const t = await getTranslations("ourwork");
  const locale = await getLocale();
  const isAr = locale === "ar";

  const [{ data: projects, error: projectsError }, { data: categories }] =
    await Promise.all([
      supabase.from("projects").select("*").order("order", { ascending: true }),
      supabase
        .from("categories")
        .select("id, title_ar, title_en")
        .order("order", { ascending: true }),
    ]);

  if (projectsError) {
    console.error("خطأ أثناء جلب المشاريع:", projectsError);
    return (
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto text-red-500 font-bold p-10 rounded-2xl bg-red-50 border border-red-100">
          {isAr ? "حدث خطأ أثناء تحميل المشاريع." : "Error loading projects."}
        </div>
      </section>
    );
  }

  // نعرض فقط التصنيفات التي لها مشاريع فعلاً
  const usedCategoryIds = new Set(
    (projects || []).map((proj) => proj.category_id).filter(Boolean),
  );

  const localizedCategories = (categories || [])
    .filter((cat) => usedCategoryIds.has(cat.id))
    .map((cat) => ({ ...cat, title: localized(cat, "title", isAr) }));

  const localizedProjects = (projects || []).map((proj) => ({
    ...proj,
    title: localized(proj, "title", isAr),
    description: localized(proj, "description", isAr),
  }));

  const breadcrumb = [{ label: isAr ? "المشاريع" : "Projects", href: null }];

  return (
    <main className="">
      <PageHero
        title={t("title")}
        description={t("description")}
        breadcrumbData={breadcrumb}
        isAr={isAr}
      />

      <div className="py-10">
        <Showcase
          categories={localizedCategories}
          items={localizedProjects}
          type="ourwork"
          isAr={isAr}
        />
      </div>
    </main>
  );
}
