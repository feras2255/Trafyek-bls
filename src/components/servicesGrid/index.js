"use client";

import { useEffect, useState } from "react";
import Card from "../card";
import { supabase } from "@/lib/supabaseClient";

const services = [
  {
    id: 1,
    title: "تصميم متجر إلكتروني",
    image: "/design.png",
    category: "تصميم",
    price: 499,
    slug: "store-design",
  },
  {
    id: 2,
    title: "التسويق الرقمي",
    image: "/design.png",
    category: "تسويق",
    price: 299,
    slug: "digital-marketing",
  },
  {
    id: 3,
    title: "خدمات Google Maps",
    image: "/design.png",
    category: "خرائط",
    price: 199,
    slug: "google-maps",
  },
  {
    id: 4,
    title: "تحسين محركات البحث",
    image: "/design.png",
    category: "SEO",
    price: 399,
    slug: "seo",
  },
  {
    id: 1,
    title: "تصميم متجر إلكتروني",
    image: "/design.png",
    category: "تصميم",
    price: 499,
    slug: "store-design",
  },
  {
    id: 2,
    title: "التسويق الرقمي",
    image: "/design.png",
    category: "تسويق",
    price: 299,
    slug: "digital-marketing",
  },
  {
    id: 3,
    title: "خدمات Google Maps",
    image: "/design.png",
    category: "خرائط",
    price: 199,
    slug: "google-maps",
  },
  {
    id: 4,
    title: "تحسين محركات البحث",
    image: "/design.png",
    category: "SEO",
    price: 399,
    slug: "seo",
  },
];

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

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const { data, error } = await supabase.from("products").select("*");
  //     if (!error) setProducts(data);
  //     console.log("products", data);
  //   };
  //   fetchProducts();
  // }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} service={product} />
        ))}
      </div>
    </div>
  );
}
