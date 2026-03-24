import { supabase } from "@/lib/supabaseClient";
import Showcase from "@/components/showcase/Showcase";
import PageHero from "@/components/ui/PageHero";
import { getLocale, getTranslations } from "next-intl/server";

export default async function Services() {
  const t = await getTranslations("services");
  const locale = await getLocale();
  const isAr = locale === "ar";

  // get services and categories
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*");

  if (error || productsError) {
    return (
      <section className="py-20">
        <div className="container mx-auto text-center text-red-500 font-bold">
          {isAr
            ? "حدث خطأ أثناء تحميل الخدمات. يرجى المحاولة لاحقًا."
            : "An error occurred while loading services. Please try again later."}
        </div>
      </section>
    );
  }

  const localizedCategories = categories.map((cat) => ({
    ...cat,
    title: isAr ? cat.title_ar : cat.title_en,
  }));

  const localizedProducts = products.map((prod) => ({
    ...prod,
    title: isAr ? prod.title_ar : prod.title_en,
    description: isAr ? prod.description_ar : prod.description_en,
  }));

  const breadcrumb = [{ label: isAr ? "الخدمات" : "Services", href: null }];

  return (
    <main>
      <PageHero
        title={t("title")}
        description={t("description")}
        breadcrumbData={breadcrumb}
        isAr={isAr}
        showButtons={true}
        scrollToId="projects-grid"
      />

      <div id="projects-grid" className="py-10">
        <Showcase
          categories={localizedCategories}
          items={localizedProducts}
          type="products"
        />
      </div>
    </main>
  );
}
