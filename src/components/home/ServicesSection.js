import { supabase } from "@/lib/supabaseClient";
import { getLocale, getTranslations } from "next-intl/server";
import { FiArrowUpLeft, FiArrowUpRight } from "react-icons/fi";
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
    return <p className="text-center py-10">حدث خطأ أثناء تحميل البيانات</p>;

  return (
    <section className="relative py-24 bg-secondary overflow-hidden">
      <div className="container mx-auto px-3 lg:px-6 relative z-10">
        <div
          className="mb-10 lg:mb-16 flex flex-col lg:flex-row items-start lg:items-center  justify-between gap-y-4"
          data-aos="fade-down"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-accent mb-4">
              {t("services")}
            </h2>
            <p className="text-accent text-sm lg:text-lg max-w-2xl">
              {t("d-services")}
            </p>
          </div>
          <Link
            href="/services"
            className="block w-fit bg-primary text-text py-2 px-4 rounded-lg  text-sm lg:text-lg "
          >
            {t("view-all")}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              href={`/services`}
              key={category.id}
              className="group block"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative h-full bg-background backdrop-blur-md rounded-lg p-4 lg:p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]">
                <div className="flex items-start justify-between mb-4">
                  {/* Circle  icon */}
                  <div className="w-14 h-14 bg-accent rounded-lg flex items-center justify-center  shadow-lg group-hover:scale-110 transition-transform duration-500">
                    <Image
                      src={category.image_url || "/images/icon.png"}
                      alt=""
                      width={32}
                      height={32}
                      className="w-8 h-8 object-cover"
                    />
                  </div>

                  {/* Arrow icon */}
                  <div className="text-[#4a3461]/30 group-hover:text-[#4a3461] transition-colors duration-300">
                    {isRtl ? (
                      <FiArrowUpLeft size={28} />
                    ) : (
                      <FiArrowUpRight size={28} />
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg lg:text-xl font-semibold text-accent">
                    {isRtl
                      ? category.title_ar
                      : category.title_en || category.title}
                  </h3>
                  <p className="text-sm lg:text-base text-subtext line-clamp-2 leading-relaxed">
                    {isRtl
                      ? category.description_ar
                      : category.description_en ||
                        "Professional digital solutions tailored for you."}
                  </p>
                </div>

                {/* Button of view details */}
                <div className="pt-6 flex items-center text-primary font-bold text-sm">
                  <span>{t("view-details")}</span>
                  <div className={`mx-2 h-[2px] w-8 bg-primary rounded-full`} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
