import Banner from "@/components/home/Banner";
import Features from "@/components/home/Features";
import Hero from "@/components/home/hero";
import ProductsSlider from "@/components/home/ProductsSlider";
import Servies from "@/components/home/servies";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main>
      <Hero />
      <Servies />
      <Banner bannre="/E-store-setup.webp" />
      <ProductsSlider />
      <Banner bannre="/Website-services.webp" />
      <Features />
    </main>
  );
}
