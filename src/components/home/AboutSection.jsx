import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { FiTrendingUp, FiLayout, FiShoppingBag } from "react-icons/fi";

export default function AboutSection() {
  const t = useTranslations("about");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <section className="overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div
            className="lg:w-1/2 relative"
            data-aos={isRtl ? "fade-right" : "fade-left"}
          >
            <div className="relative z-10 overflow-hidden rounded-3xl">
              <Image
                src="/an.webp"
                alt="Traffic Digital Agency"
                width={600}
                height={700}
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div
              className={`absolute bottom-10 ${isRtl ? "-left-10" : "-right-10"} z-20 bg-primary p-6 rounded-3xl shadow-xl text-white hidden md:block`}
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black">10+</span>
                <p className="text-sm leading-tight opacity-90">
                  {t("stats.experience")}
                  <br /> 2024 - 2025
                </p>
              </div>
            </div>
          </div>

          <div
            className="lg:w-1/2 space-y-8"
            data-aos={isRtl ? "fade-left" : "fade-right"}
          >
            <div className="space-y-4">
              <span className="inline-block px-6 py-2 bg-primary/15 border border-subtext/30 text-brand-orange text-sm font-bold rounded-full uppercase">
                {t("badge")}
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-accent leading-tight">
                {t("title")}
              </h2>
              <p className="text-sm md:text-base text-subtext leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* services info */}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/20 transition-all">
                <FiTrendingUp className="text-primary text-2xl" />
                <span className="font-bold text-maintext">
                  {t("features.marketing")}
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/20 transition-all">
                <FiLayout className="text-primary text-2xl" />
                <span className="font-bold text-maintext">
                  {t("features.web")}
                </span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-card rounded-lg border border-border hover:border-primary/20 transition-all">
                <FiShoppingBag className="text-primary text-2xl" />
                <span className="font-bold text-maintext">
                  {t("features.ecommerce")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
