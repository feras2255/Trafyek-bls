"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProductsCard from "@/components/ui/ProductsCard";

export default function ServicesGrid({ category = "" }) {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    let query = supabase
      .from("products")
      .select("id, title, price, image_url, categories(title_ar, title_en)")
      .order("order", { ascending: true });

    if (category) query = query.eq("category_id", category);

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching products:", error);
      return;
    }
    setProducts(data || []);
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductsCard key={product.id} service={product} />
        ))}
      </div>
    </div>
  );
}
