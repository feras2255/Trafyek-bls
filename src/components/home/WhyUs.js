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
      className="relative pb-20 overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Background tech elements */}
      <div
        className={`absolute top-0 ${isRtl ? "right-0" : "left-0"} w-72 h-72 bg-primary/5 blur-[120px] rounded-full pointer-events-none`}
      />
      <div
        className={`absolute bottom-0 ${isRtl ? "left-0" : "right-0"} w-96 h-96 bg-secondary/10 blur-[150px] rounded-full pointer-events-none`}
      />

      <div className="container mx-auto px-4 lg:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24" data-aos="fade-up">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[2px] bg-primary rounded-full" />
            <span className="text-primary font-black tracking-[0.25em] uppercase text-xs md:text-sm">
              {isRtl ? "لماذا تختارنا" : "Why Choose Us"}
            </span>
            <span className="w-10 h-[2px] bg-primary rounded-full" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-accent leading-[1.15] mb-8">
            {t("title") || "حلولنا تضمن نمو أعمالك"}
          </h2>

          <div className="relative w-28 h-1.5 bg-gray-100 rounded-full mx-auto overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-primary w-1/3 rounded-full animate-shimmer" />
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={item.delay}
              className="group relative bg-text border border-border rounded-xl py-10 px-5 transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(123,63,152,0.15)] hover:border-primary/30  flex flex-col items-center text-center"
            >
              {/* Animated Icon Box */}
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
                <div className="w-20 h-20 bg-primary/15 text-primary rounded-xl flex items-center justify-center text-4xl relative z-10 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:rotate-[15deg] group-hover:shadow-xl group-hover:shadow-primary/20">
                  {item.icon}
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-black text-accent mb-5 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-subtext leading-relaxed text-base font-medium">
                {item.desc}
              </p>

              {/* Bottom Interactive Glow */}
              <div className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-[2.5rem]" />

              <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="flex gap-1">
                  <span className="w-1 h-1 rounded-full bg-primary" />
                  <span className="w-4 h-1 rounded-full bg-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
