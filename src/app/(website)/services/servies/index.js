"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Slider() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (!error) setCategories(data);
    };
    fetchCategories();
  }, []);
  return (
    <div className="container mx-auto px-4 py-0 ">
      <div className="bg-secondary w-fit mx-auto px-8 py-1  flex items-center justify-center rounded-lg mb-8">
        <h1 className="text-3xl font-semibold text-maintext ">خدماتنا</h1>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={6}
        slidesPerView={3}
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
        className="w-full h-[120px] sm:h-[200px] md:h-[220px] lg:h-[250px]"
      >
        {categories.map((category) => (
          <SwiperSlide
            key={category.id}
            className="relative flex items-center justify-center"
          >
            <Link
              href={`/services/${category.slug}`}
              className="w-full h-full block relative"
            >
              <Image
                src={category.image_url}
                alt={category.title}
                fill
                className="object-cover"
                priority
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
