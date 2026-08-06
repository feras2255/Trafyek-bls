import Link from "next/link";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import Button from "../ui/button";
import EvaluationBanner from "@/components/home/EvaluationBanner";

export default async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("hero");

  const isRtl = locale === "ar" || locale === "ur";

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-between bg-background overflow-hidden pt-8 px-6">
      <div className="absolute top-0 right-0 w-[500px] h-full bg-primary/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto flex flex-col lg:flex-row gap-12 items-center relative z-10 my-auto">
        {/* text  and buttons */}
        <div
          className={`w-full lg:w-7/12 space-y-6 text-center ${
            isRtl ? "lg:text-right" : "lg:text-left"
          }`}
        >
          <div
            className="inline-flex items-center gap-2 bg-secondary/40 text-primary border border-primary/10 px-4 py-1.5 rounded-full text-sm md:text-base font-bold"
            data-aos="fade-down"
          >
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            {t("preTitle")}
          </div>

          <h1
            className="text-2xl md:text-5xl lg:text-6xl font-black text-accent leading-tight lg:leading-[1.2] whitespace-pre-line"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("title")}
          </h1>

          {/* description */}
          <p
            className="text-sm md:text-base lg:text-lg text-subtext leading-relaxed max-w-2xl lg:mx-0 mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t("description")}
          </p>

          {/* buttons */}
          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-center lg:justify-start"
          >
            <Button title={t("button")} color="primary" href="/contact" />
            <Link
              href="/trafyekbls.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("ourWork")}
              className="w-full md:w-auto group relative inline-flex items-center justify-center bg-secondary border border-primary/30 text-gray-800 font-bold px-8 py-3.5 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer"
            >
              {t("ourWork")}
            </Link>
          </div>

          {/* partners  images */}
          <div
            className="flex items-center gap-3 pt-3 justify-center lg:justify-start"
            data-aos="fade-up"
            data-aos-delay="350"
          >
            <div className="flex -space-x-2 overflow-hidden rtl:space-x-reverse">
              <div className="h-9 w-9 rounded-full ring-2 ring-white bg-purple-900 text-white flex items-center justify-center text-xs font-bold">
                أ.ق
              </div>
              <div className="h-9 w-9 rounded-full ring-2 ring-white bg-blue-900 text-white flex items-center justify-center text-xs font-bold">
                خ.ع
              </div>
              <div className="h-9 w-9 rounded-full ring-2 ring-white bg-amber-500 text-white flex items-center justify-center text-xs font-bold">
                س.د
              </div>
            </div>
            <span className="text-xs md:text-sm font-semibold text-gray-600">
              {t("trustedBy")}
            </span>
          </div>
        </div>

        {/* image */}
        <div
          className="relative w-full lg:w-5/12 flex justify-center"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <div className="relative w-full max-w-[480px]">
            <div className="absolute -top-6 -left-4 md:-left-8 z-20 bg-white shadow-xl rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-gray-100">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <span className="text-xs font-bold text-gray-800">
                {t("rating")}
              </span>
            </div>

            <div className="relative w-full h-[280px] sm:h-[340px] bg-white rounded-[2rem] border-2 border-dashed border-gray-300 p-3 shadow-lg flex items-center justify-center overflow-hidden">
              <Image
                src="/hero.png"
                alt={t("title")}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                className="object-contain p-4"
              />
            </div>

            <div className="absolute -bottom-5 -right-2 md:-right-6 z-20 bg-white shadow-xl rounded-2xl p-3.5 flex items-center gap-3 border border-gray-100 min-w-[170px]">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white font-bold shadow-md">
                ★
              </div>
              <div>
                <h4 className="text-sm font-black text-gray-900">
                  {t("projectsCount")}
                </h4>
                <p className="text-[11px] text-gray-500">{t("delivered")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EvaluationBanner />
    </section>
  );
}
