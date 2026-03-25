import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import SectionTitle from "./SectionTitle";

export default async function Partners() {
  const { data: partners, error } = await supabase
    .from("partners")
    .select("*")
    .order("order", { ascending: true });
  if (error) {
    return <p>حدث خطأ أثناء جلب الخدمات.</p>;
  }
  return (
    <section className="container mx-auto px-4 lg:px-6">
      <SectionTitle
        text="شركاء النجاح"
        desc="بعض الشركات التي نفتخر بوصفهم أصدقاءً وشركاء في نمو الأعمال"
      />

      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-x-5 md:gap-y-12">
        {partners.map((partner, index) => (
          <div
            key={partner.id}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="relative w-full h-10 md:h-14 lg:h-20 pt-2 border border-border rounded-lg flex flex-col items-center cursor-pointer overflow-hidden"
          >
            <Image
              src={partner.image_url}
              alt={`partner${partner.id}`}
              fill
              className=" object-cover rounded-lg"
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
}
