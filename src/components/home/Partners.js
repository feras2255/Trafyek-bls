"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function Partners() {
  const Partnersloogo = [
    {
      id: 1,
      image_url: "/partners/Sketch.png",
    },
    {
      id: 2,
      image_url: "/partners/figma.png",
    },
    {
      id: 3,
      image_url: "/partners/WordPress.png",
    },
    {
      id: 4,
      image_url: "/partners/salla.png",
    },
    {
      id: 5,
      image_url: "/partners/zid.png",
    },
    {
      id: 6,
      image_url: "/partners/Elementor.png",
    },
  ];
  return (
    <section className="w-full overflow-hidden bg-background pb-1">
      <div className="max-w-4xl mx-auto px-6">
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
          {Partnersloogo.map((pattner) => (
            <SwiperSlide
              key={pattner.id}
              className="flex items-center justify-center"
            >
              <div className="w-fit mx-auto px-6 py-1  flex items-center justify-center rounded-lg mb-8">
                <Image
                  src={pattner.image_url}
                  alt="pattner"
                  width={130}
                  height={130}
                  className="object-cover "
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
