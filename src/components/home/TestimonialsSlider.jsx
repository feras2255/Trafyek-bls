"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

// استيراد أنماط Swiper الأساسية
import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsSlider({ testimonials = [], isAr = true }) {
  const defaultTestimonials = [
    {
      id: 1,
      name: "سارة الدوسري",
      role: "المديرة التنفيذية · عيادات لمسة",
      comment:
        "التزام كامل بالمواعيد ونتائج ملموسة، مع دعم مستمر بعد الإطلاق. شركاء نجاح حقيقيون.",
      rating: 5,
      image: "/client1.png",
    },
    {
      id: 2,
      name: "خالد العتيبي",
      role: "مدير التسويق · مجموعة العتيبي للمقاولات",
      comment:
        "أصبح موقعنا أول نتيجة تظهر لعملائنا المحتملين في الرياض، والتعامل كان مؤسسياً ومنظماً.",
      rating: 5,
      image: "/client2.png",
    },
    {
      id: 3,
      name: "أروى القحطاني",
      role: "المؤسسة والرئيسة التنفيذية · متجر أروى",
      comment:
        "ضاعفنا مبيعاتنا خلال 3 أشهر فقط بعد إطلاق المتجر الجديد. الفريق فهم أهدافنا التجارية بدقة.",
      rating: 5,
      image: "/client3.png",
    },
  ];

  const dataToDisplay =
    testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="container mx-auto px-4 py-16">
      {/* عنوان القسم */}
      <div className="text-center mb-12 space-y-3">
        <div className="inline-block bg-[#F3E8FF] text-[#7C3AED] px-4 py-1.5 rounded-full text-sm font-bold">
          {isAr ? "آراء عملائنا" : "Testimonials"}
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-[#1E293B]">
          {isAr ? "ماذا يقول عملاؤنا عنا" : "What Our Clients Say"}
        </h2>
      </div>

      {/* سلايدر السويبر */}
      <Swiper
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
        dir={isAr ? "rtl" : "ltr"}
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

              {/* بيانات العميل والصورة */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-auto">
                <div>
                  <h4 className="font-bold text-gray-900 text-base">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">{item.role}</p>
                </div>

                {/* دائرة الصورة */}
                <div className="w-14 h-14 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden relative shrink-0">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-gray-400 font-bold">
                      عميل
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
