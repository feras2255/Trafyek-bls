"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ServicePage({ params }) {
  const categoryId = params.categorySlug;

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-out", once: true });

    const fetchData = async () => {
      setLoading(true);

      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .select("*")
        .eq("id", categoryId)
        .single();

      if (categoryError || !categoryData) {
        console.error(categoryError);
        setLoading(false);
        return;
      }

      setCategory(categoryData);

      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .eq("category_id", categoryId);

      if (!productsError) setProducts(productsData);

      setLoading(false);
    };

    fetchData();
  }, [categoryId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        جاري التحميل...
      </div>
    );

  if (!category)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        لم يتم العثور على هذا التصنيف.
      </div>
    );

  return (
    <section className="min-h-screen py-20 container mx-auto px-4">
      <h1
        className="text-4xl font-bold text-primary mb-10 text-center"
        data-aos="fade-up"
      >
        {category.name}
      </h1>

      {products.length === 0 ? (
        <p
          className="text-center text-gray-500 text-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          لا توجد منتجات في هذا التصنيف حالياً.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product, i) => (
            <div
              key={product.id}
              className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={i * 120}
            >
              <div className="relative  aspect-square">
                <Image
                  src={product.image_url}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 md:p-4 text-center">
                <h3 className="text-sm md:text-xl font-semibold text-secondary mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-sm md:text-xl text-destructive font-bold mb-2">
                  {product.price} .رس
                </p>
                <Link
                  href={`/services/${category.id}/${product.id}`}
                  className="bg-accent text-maintext font-medium px-2 py-1.5 rounded-md  block"
                >
                  عرض التفاصيل
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
