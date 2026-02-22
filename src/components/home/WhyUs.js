"use client";
import { useTranslations, useLocale } from "next-intl";
import { FiAward, FiShield, FiHeadphones, FiCheckCircle } from "react-icons/fi";

export default function WhyUs() {
  const t = useTranslations("why_us");
  const locale = useLocale();
  const isRtl = locale === "ar";

  const items = [
    { title: t("item1"), desc: t("item1_desc"), icon: <FiAward />, delay: 100 },
    {
      title: t("item2"),
      desc: t("item2_desc"),
      icon: <FiShield />,
      delay: 200,
    },
    {
      title: t("item3"),
      desc: t("item3_desc"),
      icon: <FiHeadphones />,
      delay: 300,
    },
    {
      title: t("item4"),
      desc: t("item4_desc"),
      icon: <FiCheckCircle />,
      delay: 400,
    },
  ];

  return (
    <section
      className="relative py-24 bg-white overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* رأس القسم الممركز */}
        <div className="text-center max-w-3xl mx-auto mb-20" data-aos="fade-up">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            {isRtl ? "لماذا نحن" : "Why Us"}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-accent leading-tight mb-6">
            {t("title")}
          </h2>
          <div className="w-20 h-1.5 bg-primary rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={item.delay}
              className="bg-secondary group relative flex flex-col items-center text-center rounded-xl p-4 transition-all duration-300"
            >
              {/* الأيقونة */}
              <div className="w-16 h-16 bg-slate-50 text-primary rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-primary group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-sm">
                {item.icon}
              </div>

              {/* المحتوى */}
              <h3 className="text-xl font-bold text-accent mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>

              <p className="text-subtext leading-relaxed text-sm md:text-base">
                {item.desc}
              </p>

              {/* لمسة ديكورية تظهر عند الحوم */}
              <div className="absolute -bottom-4 w-0 h-1 bg-primary/20 rounded-full group-hover:w-12 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
