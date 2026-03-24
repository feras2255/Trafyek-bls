import ConsultationSection from "@/components/home/ConsultationSection";
import CustomizationSection from "@/components/home/CustomizationSection";
import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import WhyUs from "@/components/home/WhyUs";
import OurTools from "@/components/home/OurTools";
import ServicesSection from "@/components/home/ServicesSection";
import PricingToggle from "@/components/home/PricingToggle";
import FAQ from "@/components/home/FAQ";
import MarqueeSlider from "@/components/home/MarqueeSlider";
import ProjectsSlider from "@/components/home/ProjectsSlider";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import ServiceRequest from "@/components/ui/ServiceRequest";

export default function Home() {
  return (
    <main className="mt-20 space-y-10">
      <Hero />
      <MarqueeSlider />
      <AboutSection />
      <ServicesSection />
      <Partners />
      <ServiceRequest />
      <StatsSection />
      <WhyUs />
      {/* 
      <ProjectsSlider />
      <ServicesSection />
      <OurTools />
      <WhyUs />
      <CustomizationSection />
      <PricingToggle />
      <ConsultationSection />
    */}
      <FAQ />
    </main>
  );
}
