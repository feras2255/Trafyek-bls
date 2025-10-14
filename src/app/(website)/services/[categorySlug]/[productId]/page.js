"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

import { useSiteSettings } from "@/app/context/SiteSettingsContext";

export default function ProductDetailsPage({ params }) {
  const settings = useSiteSettings();
  const { productId, categorySlug } = params;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  console.log(product);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const id = Number(productId);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setProduct(data);
      setLoading(false);
    };

    fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        جاري تحميل تفاصيل المنتج...
      </div>
    );

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        لم يتم العثور على هذا المنتج.
      </div>
    );

  return (
    <section className="min-h-screen py-20 container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8" data-aos="fade-up">
        <div className="relative w-full md:w-1/2 aspect-square rounded-xl overflow-hidden shadow-md">
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            {product.title}
          </h1>
          <p className="text-lg text-gray-700 leading-relaxed">
            {product.description || "لا يوجد وصف متاح لهذا المنتج."}
          </p>
          <p className="text-2xl font-semibold text-destructive">
            السعر: {product.price} ر.س
          </p>
          <div className="flex gap-4 mx-auto">
            <a
              href={`https://wa.me/${settings.settings.whatsapp}`}
              className="bg-accent text-maintext font-medium px-4 py-2 rounded-md w-fit"
            >
              اطلب الان
            </a>
            <Link
              href={`/services/${categorySlug}`}
              className="bg-accent text-sm text-maintext font-medium px-4 py-2 rounded-md w-fit"
            >
              ← العودة إلى التصنيف
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
