"use client";

import { useEffect } from "react";

import Image from "next/image";
import SectionTitle from "./SectionTitle";

export default function CustomizationSection() {
  const items = [
    {
      title: "خطوط متناسقة ومميزة",
      text: "نختار الخطوط بعناية وفق هويتك البصرية لضمان تجربة بصرية متسقة وراقية.",
      image: "/fonts.webp",
    },
    {
      title: "ألوان متناغمة",
      text: "نعتمد لوحة ألوان مخصصة لمجال مشروعك لتعكس شخصيته وتعزز الرسالة المراد إيصالها.",
      image: "/color.webp",
    },
    {
      title: "تصميم ملهم",
      text: "نبتكر تصميمًا عصريًا وجذابًا يعكس رؤية مشروعك ويترك انطباعًا دائمًا.",
      image: "/dsin.webp",
    },
  ];

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 z-10">
        <SectionTitle text="تخصيص كامل لمشروعك" />

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-t from-accent/50 to-accent/10 flex flex-col items-center text-center p-4 rounded-2xl"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <h3 className="text-2xl font-semibold text-primary mb-3">
                {item.title}
              </h3>
              <p className="text-foreground/80 mb-6 leading-relaxed">
                {item.text}
              </p>

              <div className=" relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="object-cover drop-shadow-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
