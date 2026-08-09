export const revalidate = 3600;

import Button from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { FiInfo } from "react-icons/fi";
import PageHero from "@/components/ui/PageHero";
import { notFound } from "next/navigation";

import { cities } from "@/data/cities";
import { serviceCities } from "@/data/serviceCities";

/* =========================================================
   Generate Static Params
========================================================= */

export async function generateStaticParams() {
  const { data: services } = await supabase.from("categories").select("id");

  if (!services) {
    return [];
  }

  const params = [];

  for (const service of services) {
    const serviceContent = serviceCities[service.id];

    if (!serviceContent) {
      continue;
    }

    for (const city of cities) {
      if (serviceContent[city.slug]) {
        params.push({
          id: service.id.toString(),
          city: city.slug,
        });
      }
    }
  }

  return params;
}

/* =========================================================
   Metadata
========================================================= */

export async function generateMetadata({ params }) {
  const { id, city: citySlug } = await params;

  const locale = await getLocale();
  const isAr = locale === "ar";

  /* Get service */

  const { data: service } = await supabase
    .from("categories")
    .select("id, title_ar, title_en, description_ar, description_en, image_url")
    .eq("id", id)
    .single();

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  /* Get city from local file */

  const city = cities.find((item) => item.slug === citySlug);

  if (!city) {
    return {
      title: "City Not Found",
    };
  }

  /* Get city content from local file */

  const content = serviceCities[service.id]?.[citySlug];

  if (!content) {
    return {
      title: "Page Not Found",
    };
  }

  const serviceTitle = isAr
    ? service.title_ar
    : service.title_en || service.title_ar;

  const title = isAr ? content.meta_title_ar : content.meta_title_en;

  const description = isAr
    ? content.meta_description_ar
    : content.meta_description_en;

  const canonical = `https://www.trafyekbls.com/${locale}/services/${id}/${citySlug}`;

  return {
    title:
      title ||
      `${serviceTitle} ${isAr ? "في" : "in"} ${
        isAr ? city.name_ar : city.name_en
      }`,

    description,

    alternates: {
      canonical,
    },

    openGraph: {
      title,
      description,
      url: canonical,
      type: "website",

      images: service.image_url
        ? [
            {
              url: service.image_url,
              alt: title,
            },
          ]
        : [],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: service.image_url ? [service.image_url] : [],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

/* =========================================================
   Page
========================================================= */

export default async function ServiceCityPage({ params }) {
  const { id, city: citySlug } = await params;

  const locale = await getLocale();
  const isAr = locale === "ar";

  /* =======================================================
     Get Service
  ======================================================= */

  const { data: service, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !service) {
    notFound();
  }

  /* =======================================================
     Get City
  ======================================================= */

  const city = cities.find((item) => item.slug === citySlug);

  if (!city) {
    notFound();
  }

  /* =======================================================
     Get Local City Content
  ======================================================= */

  const cityContent = serviceCities[service.id]?.[citySlug];

  if (!cityContent) {
    notFound();
  }

  /* =======================================================
     Text
  ======================================================= */

  const serviceTitle = isAr
    ? service.title_ar
    : service.title_en || service.title_ar;

  const cityName = isAr ? city.name_ar : city.name_en;

  const intro = isAr ? cityContent.intro_ar : cityContent.intro_en;

  const content = isAr ? cityContent.content_ar : cityContent.content_en;

  const pageTitle = isAr
    ? `${serviceTitle} في ${cityName}`
    : `${serviceTitle} in ${cityName}`;

  /* =======================================================
     Breadcrumb
  ======================================================= */

  const breadcrumb = [
    {
      label: isAr ? "الخدمات" : "Services",
      href: `/${locale}/services`,
    },

    {
      label: serviceTitle,
      href: `/${locale}/services/${id}`,
    },

    {
      label: cityName,
      href: null,
    },
  ];

  /* =======================================================
     Canonical
  ======================================================= */

  const canonical = `https://www.trafyekbls.com/${locale}/services/${id}/${citySlug}`;

  /* =======================================================
     WhatsApp
  ======================================================= */

  const whatsappMessage = isAr
    ? `مرحباً، أريد الاستفسار عن خدمة ${serviceTitle} في ${cityName}`
    : `Hello, I would like to inquire about ${serviceTitle} in ${cityName}`;

  const whatsappUrl = `https://wa.me/966530446151?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  /* =======================================================
     Schema
  ======================================================= */

  const jsonLd = {
    "@context": "https://schema.org",

    "@type": "Service",

    "@id": `${canonical}#service`,

    name: pageTitle,

    description:
      intro || (isAr ? service.description_ar : service.description_en),

    serviceType: serviceTitle,

    url: canonical,

    provider: {
      "@type": "Organization",

      name: "ترافيك بلس",

      url: "https://www.trafyekbls.com/ar",
    },

    areaServed: {
      "@type": "City",
      name: cityName,
    },
  };

  /* =======================================================
     Render
  ======================================================= */

  return (
    <main>
      {/* JSON-LD */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      {/* =================================================
          HERO
      ================================================= */}

      <PageHero
        title={pageTitle}
        description={
          isAr
            ? `${serviceTitle} في ${cityName}`
            : `${serviceTitle} in ${cityName}`
        }
        breadcrumbData={breadcrumb}
        isAr={isAr}
        showButtons={true}
      />

      {/* =================================================
          INTRO
      ================================================= */}

      <section className="relative mt-16 pb-6 z-20">
        <div className="container mx-auto px-4">
          <div className="bg-card py-6 rounded-4xl shadow-xl shadow-black/5 overflow-hidden border border-gray-100">
            <div className="flex flex-col md:flex-row items-center">
              {/* IMAGE */}

              <div className="relative w-full md:w-5/12 h-56 lg:h-90 overflow-hidden group">
                <Image
                  src={service.image_url}
                  alt={pageTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent lg:hidden" />
              </div>

              {/* TEXT */}

              <div className="py-8 px-4 w-full md:w-7/12 flex flex-col justify-center space-y-6">
                <div className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-wider bg-primary/10 w-fit px-4 py-1.5 rounded-full">
                  <FiInfo className="text-lg" />

                  {isAr ? "نظرة عامة" : "Overview"}
                </div>

                <h1 className="text-2xl lg:text-4xl font-black text-maintext">
                  {pageTitle}
                </h1>

                <p className="text-base lg:text-lg text-justify text-maintext leading-8">
                  {intro}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="flex items-center justify-start gap-3 text-primary font-black text-xl md:text-2xl">
                <span className="w-12 h-[2px] bg-primary rounded-full hidden lg:block" />

                {isAr
                  ? `تفاصيل ${serviceTitle} في ${cityName}`
                  : `${serviceTitle} in ${cityName}`}
              </div>

              <div
                className="
                  prose
                  prose-lg
                  md:prose-xl
                  prose-slate
                  max-w-none
                  text-subtext
                  leading-[2.2]

                  prose-headings:text-accent
                  prose-headings:font-black

                  prose-p:text-subtext
                  prose-strong:text-primary

                  dangerously-style-fix
                "
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </div>

            {/* =================================================
                CTA
            ================================================= */}

            <div className="bg-accent rounded-[2rem] p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-white relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-2 text-center lg:text-start">
                <h2 className="text-2xl lg:text-3xl font-black">
                  {isAr
                    ? `هل تحتاج إلى ${serviceTitle} في ${cityName}؟`
                    : `Need ${serviceTitle} in ${cityName}?`}
                </h2>

                <p className="text-white/70">
                  {isAr
                    ? "تواصل معنا اليوم لتحويل فكرتك إلى واقع ملموس."
                    : "Contact us today to turn your idea into reality."}
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 relative z-10">
                <Button
                  title={isAr ? "اطلب الخدمة" : "Request Service"}
                  color="primary"
                  size="lg"
                  className="shadow-xl hover:scale-105 transition-transform"
                  href={whatsappUrl}
                />

                <Button
                  title={isAr ? "اتصال هاتفي" : "Call Us"}
                  color="secondary"
                  size="lg"
                  className="border-2 border-white/20 hover:bg-white/10"
                  href="tel:966530446151"
                />
              </div>

              <div className="absolute -right-10 -bottom-10 size-40 bg-primary/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
