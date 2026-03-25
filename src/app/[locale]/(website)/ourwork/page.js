import { supabase } from "@/lib/supabaseClient";
import Showcase from "@/components/showcase/Showcase";
import { getLocale, getTranslations } from "next-intl/server";
import PageHero from "@/components/ui/PageHero";

export default async function OurWork() {
  const t = await getTranslations("ourwork");
  const locale = await getLocale();
  const isAr = locale === "ar";

  // get categories and projects
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*");

  if (error || projectsError) {
    console.error("خطأ أثناء جلب المشاريع:", error || projectsError);
    return (
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto text-red-500 font-bold p-10 rounded-2xl bg-red-50 border border-red-100">
          {isAr ? "حدث خطأ أثناء تحميل المشاريع." : "Error loading projects."}
        </div>
      </section>
    );
  }

  // translate the data
  const localizedCategories = categories.map((cat) => ({
    ...cat,
    title: isAr ? cat.title_ar : cat.title_en,
  }));

  const localizedProjects = projects.map((proj) => ({
    ...proj,
    title: isAr ? proj.title_ar : proj.title_en,
    description: isAr ? proj.description_ar : proj.description_en,
  }));

  const breadcrumb = [{ label: isAr ? "المشاريع" : "Projects", href: null }];

  return (
    <main className="">
      <PageHero
        title={t("title")}
        description={t("decription")}
        breadcrumbData={breadcrumb}
        isAr={isAr}
      />

      {/* View Our Work */}
      <div className="py-25">
        <Showcase
          categories={localizedCategories}
          items={localizedProjects}
          type="projects"
          isAr={isAr}
        />
      </div>
    </main>
  );
}
