import ConsultationSection from "@/components/home/ConsultationSection";
import CustomizationSection from "@/components/home/CustomizationSection";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import ProductsSlider from "@/components/home/ProductsSlider";
import WhyUs from "@/components/home/WhyUs";
import OurTools from "@/components/home/OurTools";
import ServicesSection from "@/components/home/ServicesSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Partners />
      <ServicesSection />
      <OurTools />
      <WhyUs />
      <CustomizationSection />
      <ConsultationSection />
      <ProductsSlider />
      <Features />
    </main>
  );
}
