export const revalidate = 0;

import Button from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { FiCheckCircle, FiInfo, FiTag } from "react-icons/fi";
import PageHero from "@/components/ui/PageHero";

export default async function ServiceDetails({ params }) {
  const { id } = await params;
  const t = await getTranslations("services");
  const locale = await getLocale();
  const isAr = locale === "ar";

  const { data: service, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !service) {
    return (
      <div className="text-center py-20 text-gray-500 font-bold">
        {isAr
          ? "هذه الخدمة غير موجودة حالياً."
          : "This service is not available."}
      </div>
    );
  }

  const title = isAr ? service.title_ar : service.title_en || service.title;
  const description = isAr
    ? service.description_ar
    : service.description_en || service.description;
  const longDescription = isAr
    ? service.long_description_ar
    : service.long_description_en || service.long_description;

  const breadcrumb = [
    { label: isAr ? "الخدمات" : "Services", href: "/services" },
    { label: title, href: null },
  ];

  return (
    <main className="min-h-screen bg-[#fcfcfc]">
      <PageHero
        title={title}
        description={t("desc_hero")}
        breadcrumbData={breadcrumb}
        isAr={isAr}
        showButtons={true}
      />

      {/* 1. Header Section: Image & Brief Description Side by Side */}
      <section className="relative mt-16 pb-6 z-20">
        <div className="container mx-auto px-4">
          <div className="bg-card py-6 rounded-4xl shadow-xl shadow-black/5 overflow-hidden border border-gray-100">
            <div className="flex flex-col md:flex-row items-center">
              {/* الصورة مع تأثير */}
              <div className="relative w-full md:w-5/12 h-56 lg:h-90 overflow-hidden group">
                <Image
                  src={service.image_url}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
              </div>

              {/* description */}
              <div className="py-8 px-4 w-full md:w-7/12 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider bg-primary/10 w-fit px-4 py-1.5 rounded-full">
                  <FiInfo className="text-lg" />
                  {isAr ? "نظرة عامة" : "Overview"}
                </div>

                <h2 className="text-base lg:text-lg text-justify text-maintext">
                  &quot; {description} &quot;
                </h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Detailed Content: Below the main header */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-12">
            <div className="space-y-6 ">
              <div className="flex items-center justify-start gap-3 text-primary font-black text-xl md:text-2xl">
                <span className="w-12 h-[2px] bg-primary rounded-full hidden lg:block" />
                {isAr ? "تفاصيل الخدمة الشاملة" : "Full Service Details"}
              </div>

              {/* description long view */}
              <div
                className="prose prose-lg md:prose-xl prose-slate max-w-none 
                  text-subtext leading-[2.2]
                  prose-headings:text-accent prose-headings:font-black
                  prose-p:text-subtext prose-strong:text-primary
                  dangerously-style-fix"
                dangerouslySetInnerHTML={{ __html: longDescription }}
              />
            </div>

            {/* أزرار التواصل - Floating style on mobile? No, sticky or bottom */}
            <div className="bg-accent rounded-[2rem] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-2 text-center lg:text-start">
                <h3 className="text-2xl lg:text-3xl font-black">
                  {isAr ? "هل أنت جاهز للبدء؟" : "Ready to Start?"}
                </h3>
                <p className="text-white/70">
                  {isAr
                    ? "تواصل معنا اليوم لتحويل فكرتك إلى واقع ملموس."
                    : "Contact us today to turn your idea into reality."}
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 relative z-10">
                <Button
                  title={isAr ? "اطلب الخدمة" : "Order Now"}
                  color="primary"
                  size="lg"
                  className=" shadow-xl hover:scale-105 transition-transform"
                  href={`https://wa.me/966530446151?text=${encodeURIComponent(isAr ? `استفسار عن: ${title}` : `Inquiry about: ${title}`)}`}
                />
                <Button
                  title={isAr ? "اتصال هاتفي" : "Call Us"}
                  color="secondary"
                  size="lg"
                  className=" border-2 border-white/20 hover:bg-white/10"
                  href="tel:966530446151"
                />
              </div>

              {/* Decorative background shape */}
              <div className="absolute -right-10 -bottom-10 size-40 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
