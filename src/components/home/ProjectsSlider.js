"use client";

import { supabase } from "@/lib/supabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProjectsSlider() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchprojects = async () => {
      const { data, error } = await supabase.from("projects").select("*");

      if (error) {
        console.error("خطأ أثناء جلب المنتجات:", error.message);
      } else {
        setProjects(data || []);
      }
    };

    fetchprojects();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary">
          بعض مشاريعنا
        </h2>
        <Link
          href="/projects"
          aria-label="عرض الكل"
          className="text-sm md:text-base font-semibold text-third underline"
        >
          عرض الكل
        </Link>
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        loop={true}
        speed={3000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {projects.map((project) => (
          <SwiperSlide
            key={project.id}
            className="flex items-center justify-center"
          >
            <div className="w-fit mx-auto md:px-1 py-1  flex items-center justify-center rounded-lg">
              <Image
                src={project.image_url}
                alt="project"
                width={400}
                height={500}
                className="object-cover rounded-xl"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
