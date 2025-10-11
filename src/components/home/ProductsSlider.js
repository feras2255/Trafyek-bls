"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import SectionTitle from "./SectionTitle";
import ProductsCard from "../ui/ProductsCard";

export default function ProductsSlider() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select(`
          *,
          categories:category_id (
            id,
            title
          )
        `);

      if (error) {
        console.error("خطأ أثناء جلب المنتجات:", error.message);
      } else {
        setProducts(data || []);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <SectionTitle text="بعض خدماتنا" />
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={6}
        slidesPerView={2}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="w-full h-full"
      >
        {products.length > 0 ? (
          products.map((product) => (
            <SwiperSlide
              key={product.id}
              className="relative flex items-center justify-center"
            >
              <ProductsCard
                service={product}
                prams={product.categories?.id || "uncategorized"}
              />
            </SwiperSlide>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full py-10">
            لا توجد منتجات لعرضها حاليًا.
          </p>
        )}
      </Swiper>
    </div>
  );
}
