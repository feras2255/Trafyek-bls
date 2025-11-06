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
    <section className="container mx-auto px-4 py-12">
      <SectionTitle
        text="شركاء النجاح"
        desc="بعض الشركات التي نفتخر بوصفهم أصدقاءً وشركاء في نمو الأعمال"
      />

      <div className="grid grid-cols-4 md:grid-cols-6 gap-3 md:gap-6">
        {partners.map((partner, index) => (
          <div
            key={partner.id}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="pt-2 rounded-2xl flex flex-col items-center cursor-pointer"
          >
            <Image
              src={partner.image_url}
              alt={`partner${partner.id}`}
              width={200}
              height={200}
              className=" object-contain"
              priority
            />
          </div>
        ))}
      </div>
    </section>
  );
}
