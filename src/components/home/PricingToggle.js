"use client";
import { Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function PricingToggle() {
  const [type, setType] = useState("website");

  const data = {
    website: [
      {
        title: "موقع أساسي",
        dic: "كل شركة تحتاج إلى موقع، هذه الباقة لموقع تعريفي في صفحة واحدة.",
        price: "1000",
        features: [
          "تصميم احترافي",
          "متجاوب لكل الأجهزة",
          "لغة واحدة",
          "صفحة واحدة",
          "SEO اساسي",
          "استضافة و نطاق",
          "30 يوم دعم فني",
          "التسليم في 5-7 ايام",
        ],
      },
      {
        title: "موقع متكامل",
        dic: "موقع متكامل عربي وانجليزي متعدد الصفحات يناسب أغلب الشركات.",
        price: "3000",
        features: [
          "تصميم احترافي",
          "متجاوب لكل الأجهزة",
          "عربي و انجليزي",
          "10 صفحات أساسية",
          "SEO أساسي",
          "استضافة و نطاق مجاناً",
          "70 يوم دعم فني",
          "التسليم في 10-13 يوم",
        ],
        highlight: true,
      },
      {
        title: "موقع احترافي",
        dic: "موقع احترافي عربي وانجليزي مع أكثر من 20 صفحة لعرض الخدمات والأعمال.",
        price: "5000",
        features: [
          "تصميم احترافي ومتجاوب",
          "عربي و انجليزي",
          "10 صفحات أساسية",
          "10 صفحات فرعية",
          "SEO متكامل",
          "استضافة و نطاق مجاناً",
          "180 يوم دعم فني",
          "التسليم في 20 يوم",
        ],
      },
    ],
    store: [
      {
        title: "تصميم متجر",
        price: "2500",
        dic: "متجر إلكتروني بسيط مناسب للبدء.",
        features: ["20 منتج", "متجاوب", "دفع إلكتروني", "30 يوم دعم"],
      },
      {
        title: "",
        price: "4500",
        dic: "متجر متكامل جاهز للبيع الفعلي.",
        features: [
          "عدد منتجات غير محدود",
          "بوابات دفع متعددة",
          "تقارير",
          "90 يوم دعم",
        ],
        highlight: true,
      },
      {
        title: "Enterprise Store",
        price: "9000",
        dic: "متجر احترافي مع نظام متكامل وتطوير خاص.",
        features: [
          "تصميم خاص",
          "تكامل API",
          "تطبيق جوال اختياري",
          "6 شهور دعم",
        ],
      },
    ],
  };

  const plans = data[type];

  return (
    <section className="py-16 px-4 bg-[#111] text-maintext">
      <div className="flex justify-center items-center gap-6 text-xl font-bold mb-6">
        <span className={type === "store" ? "opacity-100" : "opacity-50"}>
          متجر
        </span>

        <button
          className="relative w-16 h-8 bg-gray-600 rounded-full p-1 flex items-center cursor-pointer"
          onClick={() => setType(type === "website" ? "store" : "website")}
        >
          <span
            className={`w-6 h-6 rounded-full bg-purple-400 transition-all ${
              type === "website" ? "translate-x-0" : "-translate-x-8"
            }`}
          ></span>
        </button>

        <span className={type === "website" ? "opacity-100" : "opacity-50"}>
          موقع
        </span>
      </div>

      <p className="text-sm text-center opacity-60 mb-8">
        يمكنك تغيير الباقة في أي وقت، اختر ما يناسب مشروعك.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, i) => {
          const message = `مرحباً، أريد الاستفسار عن باقة: ${plan.title} بسعر ${plan.price} ريال`;
          const whatsappLink = `https://wa.me/966530446151?text=${encodeURIComponent(
            message
          )}`;

          return (
            <div
              key={i}
              className={`bg-[#1a1a1a] rounded-2xl p-6 border hover:border-accent transition-all ${
                plan.highlight
                  ? "border-accent shadow-lg shadow-purple-500/20 scale-105"
                  : "border-transparent"
              }`}
            >
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <div className="flex items-center">
                <h4 className="text-3xl font-bold mr-2">{plan.price}</h4>
                <span className="text-purple-500 mr-2">ريال</span>
              </div>
              <p className="text-sm text-gray-300 mt-3">{plan.dic}</p>

              <div className="w-full flex justify-center my-6">
                <Link
                  href={whatsappLink}
                  target="_blank"
                  className="bg-accent transition px-6 py-2 rounded-xl"
                >
                  اختر الباقة المناسبة
                </Link>
              </div>

              <ul className="text-sm text-gray-300 space-y-3">
                {plan.features.map((f, index) => (
                  <li key={index} className="flex gap-2">
                    <Check size={18} className="text-purple-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
