import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import WhyUs from "@/components/home/WhyUs";
import FAQ from "@/components/home/FAQ";
import MarqueeSlider from "@/components/home/MarqueeSlider";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import ServiceRequest from "@/components/ui/ServiceRequest";
import Services from "@/components/home/Services";

export default function Home() {
  return (
    <main className="mt-16 space-y-10">
      <Hero />
      <MarqueeSlider />
      <AboutSection />
      <Services isHomePage={true} />
      <Partners />
      <ServiceRequest />
      <StatsSection />
      <WhyUs />

      <FAQ />
    </main>
  );
}
