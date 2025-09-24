"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Card from "../card";
import Title from "./Title";

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
    id: 5,
    title: "تصميم متجر إلكتروني",
    image: "/design.png",
    category: "تصميم",
    price: 499,
    slug: "store-design",
  },
  {
    id: 6,
    title: "التسويق الرقمي",
    image: "/design.png",
    category: "تسويق",
    price: 299,
    slug: "digital-marketing",
  },
  {
    id: 7,
    title: "خدمات Google Maps",
    image: "/design.png",
    category: "خرائط",
    price: 199,
    slug: "google-maps",
  },
  {
    id: 8,
    title: "تحسين محركات البحث",
    image: "/design.png",
    category: "SEO",
    price: 399,
    slug: "seo",
  },
];

export default function ProductsSlider() {
  return (
    <div className="container mx-auto px-4 py-10 ">
      <Title />

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
        {services.map((service) => (
          <SwiperSlide
            key={service.id}
            className="relative flex items-center justify-center"
          >
            <Card service={service} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
