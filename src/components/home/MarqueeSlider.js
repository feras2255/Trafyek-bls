"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

export default function MarqueeSlider() {
  const Partnersloogo = [
    {
      id: 1,
      image_url: "/partners/salla.webp",
    },
    {
      id: 2,
      image_url: "/partners/hostinger.webp",
    },
    {
      id: 3,
      image_url: "/partners/wordprees.webp",
    },
    {
      id: 4,
      image_url: "/partners/google.webp",
    },
    {
      id: 5,
      image_url: "/partners/zid.webp",
    },
    {
      id: 6,
      image_url: "/partners/Elementor.webp",
    },
    {
      id: 7,
      image_url: "/partners/figma.webp",
    },
  ];
  return (
    <section className="w-full overflow-hidden bg-gradient-to-t from-background via-fourth/30 to-primary/60 pb-1 pt-14">
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
