"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FaUserCircle } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsSlider({ testimonials = [] }) {
  const t = useTranslations("testimonialsSlider");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ur";

  const defaultTestimonials = [
    {
      id: 1,
      name: t("items.item1.name"),
      role: t("items.item1.role"),
      comment: t("items.item1.comment"),
      rating: 5,
      image: "/client1.png",
    },
    {
      id: 2,
      name: t("items.item2.name"),
      role: t("items.item2.role"),
      comment: t("items.item2.comment"),
      rating: 5,
      image: "/client2.png",
    },
    {
      id: 3,
      name: t("items.item3.name"),
      role: t("items.item3.role"),
      comment: t("items.item3.comment"),
      rating: 5,
      image: "/client3.png",
    },
    {
      id: 4,
      name: t("items.item4.name"),
      role: t("items.item4.role"),
      comment: t("items.item4.comment"),
      rating: 5,
      image: "/client4.png",
    },
    {
      id: 5,
      name: t("items.item5.name"),
      role: t("items.item5.role"),
      comment: t("items.item5.comment"),
      rating: 5,
      image: "/client5.png",
    },
  ];

  const dataToDisplay =
    testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="container mx-auto px-4 py-16">
      {/* عنوان القسم */}
      <div className="text-center mb-12 space-y-3">
        <div className="inline-block bg-[#F3E8FF] text-[#7C3AED] px-4 py-1.5 rounded-full text-sm font-bold">
          {t("badge")}
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[#1E293B]">
          {t("title")}
        </h2>
      </div>

      {/* سلايدر السويبر */}
      <Swiper
        key={locale}
        modules={[Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        dir={isRtl ? "rtl" : "ltr"}
        className="pb-12"
      >
        {dataToDisplay.map((item) => (
          <SwiperSlide key={item.id} className="h-auto">
            <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-gray-100 border border-gray-100 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-2xl">
              {/* النجوم */}
              <div className="flex text-amber-400 text-lg mb-6">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              {/* التعليق */}
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
                &ldquo;{item.comment}&rdquo;
              </p>

              {/* بيانات العميل والصورة/الأيقونة */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-auto">
                <div className="text-start">
                  <h3 className="font-bold text-gray-900 text-base">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{item.role}</p>
                </div>

                {/* دائرة الصورة أو الأيقونة */}
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-purple-200 flex items-center justify-center bg-purple-50 overflow-hidden relative shrink-0">
                  <FaUserCircle className="w-9 h-9 text-[#7C3AED]/60" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
