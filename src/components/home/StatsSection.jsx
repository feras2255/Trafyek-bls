"use client";
import { useTranslations } from "next-intl";
import { FiTarget, FiUsers, FiAward } from "react-icons/fi";

export default function StatsSection() {
  const t = useTranslations("stats");

  const stats = [
    {
      id: 1,
      number: "250+",
      label: t("projects") || "مشروع مكتمل",
      icon: <FiTarget />,
      delay: 100,
    },
    {
      id: 2,
      number: "220+",
      label: t("clients") || "شريك نجاح",
      icon: <FiUsers />,
      delay: 200,
    },
    {
      id: 3,
      number: "6+",
      label: t("experience") || "سنوات خبرة",
      icon: <FiAward />,
      delay: 300,
    },
  ];

  return (
    <section className="pt-24 relative overflow-hidden">
      {/* Background abstract element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-secondary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-24" data-aos="fade-up">
          <span className="text-primary font-black tracking-[0.25em] uppercase text-sm mb-4 block">
            {t("badge") || "أرقامنا تتحدث"}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-accent leading-tight mb-8">
            {t("title") || "نجاحنا في أرقام"}
          </h2>
          <div className="relative w-24 h-2 bg-gray-100 rounded-full mx-auto overflow-hidden">
            <div className="absolute inset-0 bg-primary w-1/2 rounded-full animate-shimmer shadow-[0_0_15px_rgba(123,63,152,0.5)]" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 max-w-6xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.id}
              data-aos="fade-up"
              data-aos-delay={stat.delay}
              className="group relative bg-brand-orange/5 rounded-3xl pt-16 border border-border transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(123,63,152,0.12)] hover:border-primary/20 flex flex-col items-center text-center"
            >
              {/* Floating Icon Container */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:-translate-y-2">
                <div className="size-20 bg-text rounded-xl shadow-xl flex items-center justify-center border border-border transition-all duration-500 group-hover:rotate-[10deg] group-hover:border-primary/30">
                  <div className="size-12 bg-secondary/20 rounded-2xl flex items-center justify-center text-primary text-4xl transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                    {stat.icon}
                  </div>
                </div>
              </div>

              {/* Number with Shimmer effect on hover */}
              <h4 className=" text-5xl lg:text-6xl font-black text-accent mb-4 tracking-tighter transition-all duration-500 group-hover:text-primary group-hover:scale-110">
                {stat.number}
              </h4>

              <p className="text-sm text-subtext font-black uppercase tracking-[0.15em] mb-8">
                {stat.label}
              </p>

              {/* Decorative Progress Bar */}
              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden transition-all duration-500 group-hover:w-32">
                <div className="h-full bg-primary w-0 transition-all duration-700 ease-out group-hover:w-full"></div>
              </div>

              {/* Hidden Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-[2.5rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
