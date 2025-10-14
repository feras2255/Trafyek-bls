"use client";

import { useEffect } from "react";
import Image from "next/image";

const skills = [
  { name: "Sketch", value: 95, icon: "/partners/Sketch.png" },
  { name: "WordPress", value: 99, icon: "/partners/WordPress.png" },
  { name: "Figma", value: 95, icon: "/partners/figma.png" },
  { name: "Elementor", value: 95, icon: "/partners/Elementor.png" },
  { name: "Salla", value: 97, icon: "/partners/salla.png" },
  { name: "Zid", value: 97, icon: "/partners/zid.png" },
];

const services = [
  {
    title: "تصميم المواقع",
    description:
      "نبدع في تصميم موقع احترافي خاص بك أو بمشروعك، ونتأكد من تسليمك موقعًا مميزًا، منافسًا، وسهل الإدارة.",
    delay: 100,
  },
  {
    title: "إدارة المواقع",
    description:
      "ندير موقع مشروعك سواء كان متجرًا إلكترونيًا أو موقع خدمات، ونحرص على تحديثه وتوفير الميزات الجديدة والحصرية.",
    delay: 200,
  },
  {
    title: "ضبط الـ SEO",
    description:
      "نحرص على ظهور موقعك في النتائج الأولى لمحركات البحث لتتصدر المنافسة وتسوق لمشروعك بفعالية.",
    delay: 300,
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white text-center">
      <h2 className="text-3xl font-bold text-primary mb-10" data-aos="fade-up">
        كيف يمكننا مساعدتك!
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition"
            data-aos="fade-up"
            data-aos-delay={service.delay}
          >
            <h3 className="text-xl font-semibold text-primary mb-3">
              {service.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div
        className="mt-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-6"
        data-aos="fade-up"
      >
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="bg-background rounded-xl p-6 border hover:shadow-lg transition"
          >
            <div className="text-3xl font-bold text-destructive">
              {skill.value}%
            </div>
            <Image
              src={`${skill.icon}`}
              alt={skill.name}
              width={80}
              height={80}
              className="mx-auto object-cover"
              priority
            />
            <div className="text-2xl text-scondary font-semibold mt-2">
              {skill.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
