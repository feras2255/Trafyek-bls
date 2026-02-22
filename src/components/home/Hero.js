import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import { getLocale } from "next-intl/server";

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
    <section className="h-full lg:h-[calc(100vh-120px)] flex items-center bg-gradient-to-b from-background to-transparent px-6 pt-6 lg:pt-10 overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row gap-8 items-center">
        <div className="w-full lg:w-7/12 space-y-4 order-2 md:order-1">
          {content.preTitle && (
            <span
              className="text-xs md:text-base text-maintext  px-4 font-semibold"
              data-aos="fade-left"
            >
              {content.preTitle}
            </span>
          )}

          {content.title && (
            <h1
              className="text-2xl lg:text-6xl font-semibold text-accent leading-normal "
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {content.title}
            </h1>
          )}

          {content.description && (
            <p
              className="text-sm md:text-base lg:text-xl text-subtext leading-relaxed "
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {content.description}
            </p>
          )}

          {content.button && (
            <div data-aos="fade-up" data-aos-delay="300" className="pt-4">
              <Link
                href={content.btn_url || "#"}
                className="inline-block items-center justify-center bg-primary text-text font-semibold px-6 py-3 rounded-xl hover:-translate-y-1.5 transition-all duration-300"
              >
                {content.button}
              </Link>
            </div>
          )}
        </div>

        <div
          className="relative w-full lg:w-5/12 group order-1 md:order-2"
          data-aos="zoom-in-right"
          data-aos-delay="400"
        >
          {content.image_url ? (
            <div className="relative w-full  mx-auto">
              <div className="relative h-40 md:h-60 w-full overflow-hidden rounded-xl ">
                <Image
                  src={content.image_url}
                  alt={content.title || "Hero Image"}
                  fill
                  priority
                  className="object-contain transition-transform duration-700 "
                />
              </div>
            </div>
          ) : (
            <div className="w-full aspect-square bg-gray-100 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-gray-300">
              <span className="text-gray-400">في انتظار الصورة...</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
