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

export default function Home() {
  return (
    <main>
      <Hero />
      <MarqueeSlider />
      <ServicesSection />
      <OurTools />
      <WhyUs />
      <CustomizationSection />
      <PricingToggle />
      <ConsultationSection />
      <Partners />
      <FAQ />
    </main>
  );
}
