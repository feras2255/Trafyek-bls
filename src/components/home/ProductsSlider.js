"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Card from "../card";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import SectionTitle from "./SectionTitle";

export default function ProductsSlider() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (!error) setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
    <div className="container mx-auto px-4 py-10 ">
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
        className="w-full h-full "
      >
        {products.map((product) => (
          <SwiperSlide
            key={product.id}
            className="relative flex items-center justify-center"
          >
            <Card service={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
