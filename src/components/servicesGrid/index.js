"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProductsCard from "@/components/ui/ProductsCard";

/**
 * STALE — this component is not imported anywhere.
 *
 * It was also unbuildable: it imported "../card/", a directory that does not
 * exist, so it would have failed to compile the moment anything referenced it.
 * The import is corrected and the hook dependency fixed so the tree lints and
 * builds clean, but the query below still selects `categories(title)` while the
 * categories table has title_ar / title_en — so it would fail at runtime too.
 *
 * Recommend deleting this file along with the other dead modules listed in the
 * audit. Left in place because removing it is your call.
 */
export default function ServicesGrid() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  const fetchProducts = useCallback(async () => {
    let query = supabase
      .from("products")
      .select("id, title, price, image_url, categories(title)");

    if (category) {
      query = query.eq("category_id", category);
    }

    const { data, error } = await query;

    if (!error) setProducts(data ?? []);
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
