"use client";

import Image from "next/image";
import SectionTitle from "./SectionTitle";

const features = [
  {
    id: 1,
    title: "خدمات ومنتجات متنوعة",
    desc: "نقدّم كل ما يحتاجه مشروعك، تصميم متاجر إلكترونية، تصميم بنرات إعلانية، إعداد كامل للمتجر، وأكثر.",
    icon: "/f1.png",
  },
  {
    id: 2,
    title: "طرق دفع مرنة وآمنة",
    desc: "نوفر لك وسائل دفع متعددة لضمان سهولة وسرعة الطلب.",
    icon: "/f2.png",
  },
  {
    id: 3,
    title: "خدمة عملاء احترافية",
    desc: "دعم فني واستشارات متوفرة طوال الأسبوع لمساعدتك في كل خطوة.",
    icon: "/f3.png",
  },
];

export default function Features() {
  return (
    <section className="container mx-auto px-4 py-10" data-aos="fade-up">
      <SectionTitle text="خصائص ترافيك بلس" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center text-center bg-card rounded-2xl  p-3 mx-auto"
          >
            <Image
              src={feature.icon}
              alt={feature.title}
              width={100}
              height={100}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold text-primary mb-2">
              {feature.title}
            </h3>
            <p className="text-secondarytext leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
