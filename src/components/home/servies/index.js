"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    id: crypto.randomUUID(),
    title: "خدمات المتاجر",
    image: "/Services.webp",
    slug: "stores-services",
  },
  {
    id: crypto.randomUUID(),
    title: "الخدمات الحكومية",
    image: "/Services2.webp",
    slug: "government-services",
  },
  {
    id: crypto.randomUUID(),
    title: "خدمات جوجل ماب",
    image: "/Services3.webp",
    slug: "google-maps",
  },
  {
    id: crypto.randomUUID(),
    title: "الخدمات المالية",
    image: "/Services4.webp",
    slug: "financial-services",
  },
  {
    id: crypto.randomUUID(),
    title: "تحسين محركات البحث",
    image: "/Services5.webp",
    slug: "seo",
  },
  {
    id: crypto.randomUUID(),
    title: "التصميم الجرافيكي",
    image: "/Services6.webp",
    slug: "graphic-design",
  },
];

export default function Slider() {
  return (
    <div className="container mx-auto px-4 py-0 ">
      <div className="bg-gradient-to-r from-accent to-destructive w-fit mx-auto px-4 py-1  flex items-center justify-center rounded-lg mb-8">
        <h1 className="text-3xl font-bold text-primary ">خدماتنا</h1>
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
        {services.map((service) => (
          <SwiperSlide
            key={service.id}
            className="relative flex items-center justify-center"
          >
            <Link
              href={`/services/${service.slug}`}
              className="w-full h-full block relative"
            >
              <Image
                src={service.image}
                alt={service.title}
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
