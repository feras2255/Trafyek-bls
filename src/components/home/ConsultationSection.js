"use client";

import { Link } from "@/i18n/navigation";

export default function ConsultationSection() {
  return (
    <section>
      <div className="container mx-auto px-6 py-16 mt-8 bg-[url('/consult.webp')] bg-cover bg-center flex flex-col items-center text-center  rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-6 ">
          لم تجد الباقة المناسبة؟
        </h2>
        <p className="text-maintext text-md md:text-lg max-w-2xl mb-8 leading-relaxed">
          جميع باقاتنا مصممة لتلبية احتياجات المشاريع الصغيرة والمتوسطة. يمكننا
          ترتيب استشارة شخصية لمناقشة خصائص مشروعك بشكل مفصل ووضع الحل الأنسب
          لك.
        </p>
        <Link
          href="/contact"
          aria-label="تواصل معنا"
          className="bg-accent text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          تواصل معنا الآن
        </Link>
      </div>
    </section>
  );
}
