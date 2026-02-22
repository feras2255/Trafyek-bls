"use client";
import { useTranslations } from "next-intl";
import { FiTarget, FiUsers, FiAward } from "react-icons/fi";

export default function StatsSection() {
  const t = useTranslations("stats");

  const stats = [
    {
      id: 1,
      number: "150+",
      label: t("projects"),
      icon: <FiTarget />,
      delay: 100,
    },
    {
      id: 2,
      number: "120+",
      label: t("clients"),
      icon: <FiUsers />,
      delay: 200,
    },
    {
      id: 3,
      number: "10+",
      label: t("experience"),
      icon: <FiAward />,
      delay: 300,
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20" data-aos="fade-up">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            {t("badge") || "أرقامنا تتحدث"}
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-accent leading-tight mb-6">
            {t("title") || "نجاحنا في أرقام"}
          </h2>
          <div className="w-20 h-1.5 bg-primary rounded-full mx-auto transition-all duration-500 hover:w-32"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.id}
              data-aos="fade-up"
              data-aos-delay={stat.delay}
              className="group relative bg-white rounded-xl  p-10 pt-16 shadow-sm border border-gray-200 flex flex-col items-center text-center transition-all duration-500 ease-in-out"
            >
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 transition-transform duration-500 ease-in-out group-hover:scale-110">
                <div className="w-20 h-20 bg-white rounded-xl shadow flex items-center justify-center border border-gray-200 transition-all duration-500 ease-in-out group-hover:rotate-[10deg] ">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-primary text-3xl transition-all duration-500 ease-in-out group-hover:bg-primary group-hover:text-white">
                    {stat.icon}
                  </div>
                </div>
              </div>

              <h4 className="text-5xl font-black text-slate-900 mb-3 tracking-tighter transition-colors duration-500 ease-in-out group-hover:text-primary">
                {stat.number}
              </h4>

              <p className="text-sm text-slate-400 font-bold uppercase tracking-[0.2em] transition-colors duration-500 group-hover:text-slate-600">
                {stat.label}
              </p>

              <div className="mt-8 w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden transition-all duration-500 ease-in-out group-hover:w-24">
                <div className="h-full bg-primary w-0 transition-all duration-700 ease-out group-hover:w-full"></div>
              </div>

              <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 -z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
