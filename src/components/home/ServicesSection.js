import { supabase } from "@/lib/supabaseClient";
import { getLocale, getTranslations } from "next-intl/server";
import { FiArrowUpLeft, FiArrowUpRight, FiLayers } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export default async function ServicesSection() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  const isRtl = locale === "ar";

  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("order", { ascending: true });

  if (error)
    return (
      <p className="text-center py-20 text-subtext italic">
        حدث خطأ أثناء تحميل البيانات
      </p>
    );

  return (
    <section className="relative py-14 bg-background-2 overflow-hidden">
      {/* Dynamic Background Element */}
      <div
        className={`absolute top-0 ${isRtl ? "left-0" : "right-0"} w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none`}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className="mb-16 flex flex-col lg:flex-row items-center md:items-start justify-between gap-8"
          data-aos="fade-down"
        >
          <div className="max-w-3xl space-y-4">
            <div className="flex items-end gap-2">
              <span className="w-10 h-1 bg-primary rounded-full" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-accent leading-tight">
                {t("services")}
              </h2>
            </div>

            <p className="text-subtext text-sm md:text-base lg:text-xl leading-relaxed">
              {t("d-services")}
            </p>
          </div>

          <Link
            href="/services"
            className="group flex items-center justify-center w-fit  gap-3 bg-primary/5 text-primary border-2 border-primary/20 hover:border-primary hover:bg-primary hover:text-text py-3 px-8 rounded-xl font-bold transition-all duration-300 shadow-sm"
          >
            {t("view-all")}
            <FiLayers className="group-hover:rotate-12 transition-transform" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              href={`/services`}
              key={category.id}
              className="group block h-full"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative h-full bg-text border border-border rounded-xl md:rounded-3xl p-4 lg:p-8 transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_30px_60px_-15px_rgba(123,63,152,0.15)] group-hover:border-primary/20">
                {/* Icon & Arrow Header */}
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 bg-background-2 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                    {category.image_url ? (
                      <Image
                        src={category.image_url}
                        alt=""
                        width={35}
                        height={35}
                        className="w-9 h-9 object-contain transition-all"
                      />
                    ) : (
                      <FiLayers className="w-8 h-8 text-primary group-hover:text-white" />
                    )}
                  </div>

                  <div className="p-3 rounded-full bg-secondary/20 text-primary opacity-40 group-hover:opacity-100 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    {isRtl ? (
                      <FiArrowUpLeft size={24} />
                    ) : (
                      <FiArrowUpRight size={24} />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className=" text-lg md:text-xl lg:text-2xl font-black text-accent group-hover:text-primary transition-colors duration-300">
                    {isRtl
                      ? category.title_ar
                      : category.title_en || category.title}
                  </h3>
                  <p className="text-subtext text-base leading-relaxed line-clamp-3">
                    {isRtl
                      ? category.description_ar
                      : category.description_en ||
                        "Professional digital solutions."}
                  </p>
                </div>

                {/* Bottom Visual Indicator */}
                <div className="mt-8 pt-8 border-t border-border flex items-center justify-between">
                  <span className="text-primary font-black text-sm uppercase tracking-wider">
                    {t("view-details")}
                  </span>
                  <div className="flex gap-1">
                    <span className="w-1 h-1 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                    <span className="w-4 h-1 rounded-full bg-primary/20 group-hover:w-8 group-hover:bg-primary transition-all" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
