import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import WhyUs from "@/components/home/WhyUs";
import FAQ from "@/components/home/FAQ";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import ServiceRequest from "@/components/ui/ServiceRequest";
import Services from "@/components/home/Services";
import { getLocale } from "next-intl/server";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import AiGeoSection from "@/components/ui/AiGeoSection";
import { localized } from "@/lib/localized";

export default async function Home() {
  const locale = await getLocale();
  const isAr = locale === "ar";
  const { data: projects, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("order", { ascending: true })
    .limit(6);

  if (error) console.error("Error loading featured projects:", error);

  const localizedProjects = (projects || []).map((proj) => ({
    ...proj,
    title: localized(proj, "title", isAr),
    description: localized(proj, "description", isAr),
  }));
  return (
    <main className="mt-16 space-y-10">
      <Hero />

      {/* <MarqueeSlider /> */}
      <AboutSection />
      <FeaturedProjects items={localizedProjects} type="ourwork" isAr={isAr} />
      <AiGeoSection />
      <Services isHomePage={true} />
      <Partners />
      <ServiceRequest />
      <StatsSection />
      <TestimonialsSlider />
      <WhyUs />

      <FAQ />
    </main>
  );
}
