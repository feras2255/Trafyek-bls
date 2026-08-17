import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import WhyUs from "@/components/home/WhyUs";
import FAQ from "@/components/home/FAQ";
import MarqueeSlider from "@/components/home/MarqueeSlider";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import ServiceRequest from "@/components/ui/ServiceRequest";
import Services from "@/components/home/Services";
import { getLocale, getTranslations } from "next-intl/server";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { siteSettings } from "@/lib/siteSettings";
import {
  alternatesFor,
  faqSchema,
  jsonLd,
  localBusinessSchema,
} from "@/lib/seo";

// Cities the business serves, used for LocalBusiness areaServed. Kept here
// rather than invented per page so the schema stays consistent site-wide.
const AREA_SERVED = [
  "الرياض",
  "جدة",
  "الدمام",
  "الخبر",
  "مكة المكرمة",
  "المدينة المنورة",
];

export async function generateMetadata() {
  const locale = await getLocale();
  // Title, description and keywords are inherited from the root layout, which
  // already describes the home page. Only the per-locale canonical and
  // hreflang need to be set here.
  return { alternates: alternatesFor(locale, "") };
}

export default async function Home() {
  const locale = await getLocale();
  const isAr = locale === "ar";
  const settings = await siteSettings();

  // The FAQ section has been on the page all along with no FAQPage schema —
  // exactly the content search engines and AI answer systems quote. Read from
  // the same translation keys the FAQ component renders, so the markup can
  // never drift from what the visitor actually sees.
  const tFaq = await getTranslations("faq");
  const faqItems = ["1", "2", "3", "4", "5"].map((n) => ({
    question: tFaq(`q${n}`),
    answer: tFaq(`a${n}`),
  }));
  const { data: projects } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6);

  const localizedProjects = (projects || []).map((proj) => ({
    ...proj,
    title: isAr ? proj.title_ar : proj.title_en,
    description: isAr ? proj.description_ar : proj.description_en,
  }));
  return (
    <main className="mt-16 space-y-10">
      {/* LocalBusiness — the biggest structured-data gap for a business that
          sells Google Maps optimisation. Fields come from site_settings; any
          value that isn't set is omitted rather than invented. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            localBusinessSchema({ locale, settings, areaServed: AREA_SERVED }),
            faqSchema({ items: faqItems }),
          ),
        }}
      />
      <Hero />
      <MarqueeSlider />
      <AboutSection />
      <Services isHomePage={true} />
      <FeaturedProjects items={localizedProjects} type="ourwork" isAr={isAr} />
      <Partners />
      <ServiceRequest />
      <StatsSection />
      <WhyUs />

      <FAQ />
    </main>
  );
}
