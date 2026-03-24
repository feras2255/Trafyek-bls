"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function MarqueeSlider() {
  const PartnersText = [
    { id: 1, text: "سلة Salla" },
    { id: 2, text: "زد Zid" },
    { id: 3, text: "ووردبريس WordPress" },
    { id: 4, text: "برمجة Programming" },
    { id: 5, text: "فيجما Figma" },
    { id: 6, text: "تصميم UI/UX" },
    { id: 7, text: "تسويق رقمي SEO" },
    { id: 8, text: "حلول جوجل ماب Google Maps" },
    { id: 9, text: "تطوير المواقع Web Development" },
    { id: 10, text: "المتاجر الإلكترونية E-commerce" },
  ];

  return (
    <section className="w-full overflow-hidden bg-background py-8 border-y border-border shadow-inner">
      <div className="container mx-auto px-4 lg:px-6 relative">
        {/* (Fading Edge) */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none ltr:hidden rtl:block" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none ltr:block rtl:hidden" />

        <Swiper
          modules={[Autoplay]}
          spaceBetween={15}
          slidesPerView={2.5}
          loop={true}
          speed={4500}
          grabCursor={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 3.5, spaceBetween: 20 },
            1024: { slidesPerView: 5.5, spaceBetween: 25 },
          }}
          className="mySwiper"
        >
          {PartnersText.map((partner) => (
            <SwiperSlide
              key={partner.id}
              className="flex items-center justify-center h-full py-2" // إزالة mb-8 لجعل السلايد متمركراً عمودياً
            >
              <div className="w-full mx-auto px-6 py-4 flex items-center justify-center rounded-xl bg-secondary/20 hover:bg-secondary/40 border border-primary/5 transition-colors duration-300">
                <p className="text-sm md:text-base font-black text-primary text-center whitespace-nowrap tracking-wide leading-none font-cairo antialiased">
                  {partner.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
