"use client";

import { supabase } from "@/lib/supabaseClient";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";

export default function ProjectsSlider() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("id, title_ar, title_en, image_url")
        .order("order", { ascending: true });

      if (error) {
        console.error("خطأ أثناء جلب المشاريع:", error.message);
        return;
      }
      setProjects(data || []);
    };

    fetchProjects();
  }, []);

  if (projects.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-secondary">
          {isAr ? "بعض مشاريعنا" : "Some of our work"}
        </h2>
        <Link
          href="/ourwork"
          aria-label={isAr ? "عرض الكل" : "View all"}
          className="text-sm md:text-base font-semibold text-third underline"
        >
          {isAr ? "عرض الكل" : "View all"}
        </Link>
      </div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        loop
        speed={3000}
        autoplay={{ delay: 0, disableOnInteraction: false }}
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
            <Link
              href={`/ourwork/${project.id}`}
              className="w-fit mx-auto md:px-1 py-1 flex items-center justify-center rounded-lg"
            >
              <Image
                src={project.image_url || "/t-logo.webp"}
                alt={project.title_ar || project.title_en || "project"}
                width={400}
                height={500}
                className="object-cover rounded-xl"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
