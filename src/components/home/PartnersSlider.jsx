"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

// استيراد أنماط Swiper
import "swiper/css";

export default function PartnersSlider({ partners }) {
  return (
    <div className="mt-8">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 6 },
        }}
        className="py-4"
      >
        {partners.map((partner, index) => (
          <SwiperSlide key={partner.id}>
            <div
              data-aos="zoom-in"
              data-aos-delay={index * 50}
              className="relative w-full h-16 md:h-20 border border-border bg-white rounded-xl flex items-center justify-center p-3 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <Image
                src={partner.image_url}
                alt={`partner-${partner.id}`}
                fill
                sizes="(max-width: 768px) 33vw, 150px"
                className="object-contain p-2 rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
