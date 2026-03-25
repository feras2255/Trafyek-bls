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
      <div className="container mx-auto relative px-0">
        {" "}
        {/* إزالة padding الـ container لضمان سلاسة التلاشي */}
        {/* تحسين طبقات التلاشي (Fading Edges) لتناسب جميع الاتجاهات */}
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20} // مسافة كافية بين العناصر
          slidesPerView={"auto"} // يجعل العرض مرن حسب طول النص
          loop={true}
          speed={5000} // سرعة الحركة (كلما زاد الرقم كانت أهدأ وأوضح)
          allowTouchMove={false} // لمنع التقطع عند اللمس
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          className="marquee-swiper"
        >
          {PartnersText.map((partner) => (
            <SwiperSlide
              key={partner.id}
              style={{ width: "auto" }} // ضروري جداً مع slidesPerView="auto"
              className="flex items-center justify-center py-2"
            >
              <div className="px-8 py-4 flex items-center justify-center rounded-2xl bg-secondary/10 hover:bg-secondary/20 border border-primary/10 transition-all duration-300">
                <p className="text-sm md:text-base font-bold text-primary whitespace-nowrap tracking-wide leading-none font-cairo antialiased">
                  {partner.text}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* إضافة CSS بسيط لضمان حركة خطية (Linear) بدون تقطيع */}
      <style jsx global>{`
        .marquee-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
}
