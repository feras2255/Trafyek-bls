import ConsultationSection from "@/components/home/ConsultationSection";
import CustomizationSection from "@/components/home/CustomizationSection";
import Features from "@/components/home/Features";
import Hero from "@/components/home/hero";
import Partners from "@/components/home/Partners";
import ProductsSlider from "@/components/home/ProductsSlider";
import Services from "@/components/home/Services";
import WhyUs from "@/components/home/WhyUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <Partners />
      <Services />
      <WhyUs />
      <CustomizationSection />
      <ConsultationSection />
      <ProductsSlider />
      <Features />
    </main>
  );
}
