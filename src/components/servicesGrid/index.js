"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import ProductsCard from "../card/";

export default function ServicesGrid() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    let query = supabase
      .from("products")
      .select("id, title, price, image_url, categories(title)");

    if (category) {
      query = query.eq("category_id", category);
    }

    const { data, error } = await query;

    if (!error) setProducts(data);
  };

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
