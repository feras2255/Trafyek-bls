import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import Button from "../ui/button";

export default async function Hero() {
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const { data, error } = await supabase.from("hero").select("*").single();

  if (error || !data) {
    console.error("Supabase Error:", error);
    return null;
  }

  const content = {
    preTitle: isRtl ? data.preTitle_ar : data.preTitle_en,
    title: isRtl ? data.title_ar : data.title_en,
    description: isRtl ? data.description_ar : data.description_en,
    button: isRtl ? data.button_ar : data.button_en,
    btn_url: data.btn_url,
    image_url: data.image_url,
  };

  return (
    <section className="relative min-h-[80vh] lg:h-[calc(100vh-120px)] flex items-center bg-background overflow-hidden pt-5 px-6">
      <div className="absolute top-0 right-0 w-[500px] h-full bg-primary/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto flex flex-col lg:flex-row gap-12 items-center relative z-10">
        {/* Content */}
        <div
          className={`w-full lg:w-7/12 space-y-6 order-2 lg:order-1 text-center ${isRtl ? "lg:text-right" : "lg:text-left"} `}
        >
          {content.preTitle && (
            <div
              className="inline-flex items-center gap-2 bg-secondary/30 text-primary border border-primary/10 px-4 py-1.5 rounded-full text-sm md:text-base font-bold"
              data-aos="fade-down"
            >
              <span className="w-2 h-2 bg-orange rounded-full animate-pulse" />
              {content.preTitle}
            </div>
          )}

          {content.title && (
            <h1
              className="text-2xl md:text-5xl lg:text-6xl font-black text-accent leading-tight lg:leading-snug"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {content.title}
            </h1>
          )}

          {content.description && (
            <p
              className="text-sm md:text-base lg:text-xl text-subtext leading-relaxed max-w-2xl lg:ml-0 lg:mr-0 mx-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {content.description}
            </p>
          )}

          {content.button && (
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="pt-6 flex flex-col md:flex-row gap-3 justify-center "
            >
              <Button
                title={content.button}
                color="primary"
                href={content.btn_url || "#"}
              />
              <Link
                // download="/trafyekbls.pdf"
                href="/trafyekbls.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center bg-primary text-text font-bold px-8 py-4 rounded-lg shadow-lg shadow-primary/20 hover:bg-hover hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                {isRtl ? "ملف اعمالنا" : "Our Work"}
              </Link>
            </div>
          )}
        </div>

        {/* Image */}
        <div
          className="relative w-full lg:w-5/12 order-1 lg:order-2"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          {content.image_url ? (
            <div className="relative w-full max-w-[500px] mx-auto group">
              <div className="relative w-full h-64 lg:h-100 overflow-hidden rounded-[2.5rem] md:border-8 md:border-white">
                <Image
                  // {content.image_url}
                  src="/hero.png"
                  alt={content.title || "Hero Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  priority
                  className="object-contain transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            </div>
          ) : (
            <div className="w-full aspect-square bg-secondary/20 rounded-[2.5rem] flex items-center justify-center border-2 border-dashed border-primary/30 text-primary/40 italic">
              Smart Solutions
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
