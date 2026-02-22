export const revalidate = 0;

import { supabase } from "@/lib/supabaseClient";
import Showcase from "@/components/showcase/Showcase";

export default async function Services() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*");

  if (error || productsError) {
    return (
      <section className="py-20">
        <div className="container mx-auto text-center text-red-500">
          حدث خطأ أثناء تحميل الخدمات. يرجى المحاولة لاحقًا.
        </div>
      </section>
    );
  }

  return <Showcase categories={categories} items={products} />;
}
