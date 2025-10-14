"use client";
import { MdDashboardCustomize, MdExtension } from "react-icons/md";

import { FaDesktop, FaHeadset } from "react-icons/fa";
import SectionTitle from "./SectionTitle";

const features = [
  {
    id: 1,
    title: "لوحة تحكم مرنة",
    desc: "تحكم كامل في المحتوى الخاص بموقعك بسهولة وسلاسة دون تعقيد.",
    icon: MdDashboardCustomize,
  },
  {
    id: 2,
    title: "تصميم ديناميكي",
    desc: "قم بتعديل الأقسام وتخصيص الصفحات بسلاسة لتناسب رؤية مشروعك.",
    icon: FaDesktop,
  },
  {
    id: 3,
    title: "تكامل مع الإضافات",
    desc: "وسع وظائف موقعك بسهولة عبر التكامل مع الإضافات والأدوات المختلفة.",
    icon: MdExtension,
  },
  {
    id: 4,
    title: "دعم مستمر",
    desc: "فريق دعم جاهز لمساعدتك في أي وقت وحل أي مشكلة تواجهك.",
    icon: FaHeadset,
  },
];

export default function Features() {
  return (
    <section className="container mx-auto px-4 py-10" data-aos="fade-up">
      <SectionTitle text="مميزات ترافيك بلس" />
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center bg-accent rounded-2xl py-3 md:p-6 mx-auto hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center mb-2">
                <Icon className="text-4xl text-primary" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-maintext mb-2">
                {feature.title}
              </h3>
              <p className="text-sm md:text-base text-ring leading-relaxed">
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
