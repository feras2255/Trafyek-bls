import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import WhyUs from "@/components/home/WhyUs";
import FAQ from "@/components/home/FAQ";
import MarqueeSlider from "@/components/home/MarqueeSlider";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import ServiceRequest from "@/components/ui/ServiceRequest";
import Services from "@/components/home/Services";
import { getLocale } from "next-intl/server";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function Home() {
  const locale = await getLocale();
  const isAr = locale === "ar";
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
