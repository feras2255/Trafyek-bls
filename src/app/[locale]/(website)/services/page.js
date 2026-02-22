export const revalidate = 0;

import { supabase } from "@/lib/supabaseClient";
import Showcase from "@/components/showcase/Showcase";
import PageHero from "@/components/ui/PageHero";
import { getLocale } from "next-intl/server";

export default async function Services() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  // جلب التصنيفات والمنتجات
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

  return (
    <main>
      <PageHero
        title={isAr ? "خدماتنا الرقمية" : "Our Digital Services"}
        description={
          isAr
            ? "نقدم حلولاً متكاملة تجمع بين التصميم الإبداعي والبرمجة الاحترافية لتنمية أعمالك."
            : "We provide integrated solutions that combine creative design and professional programming to grow your business."
        }
        breadcrumb={[{ label: isAr ? "الخدمات" : "Services" }]}
        bgImage="/serv-hero.png"
      />

      <div className="py-10">
        <Showcase
          categories={localizedCategories}
          items={localizedProducts}
          type="products"
        />
      </div>
    </main>
  );
}
