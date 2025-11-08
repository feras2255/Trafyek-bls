import { supabase } from "@/lib/supabaseClient";
import ServicesContent from "@/components/services/ServicesContent";

export default async function Services() {
  const { data: categories } = await supabase.from("categories").select("*");
  const { data: products } = await supabase.from("products").select("*");

  return <ServicesContent categories={categories} products={products} />;
}
