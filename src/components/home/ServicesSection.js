import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import SectionTitle from "./SectionTitle";
import Link from "next/link";

export default async function ServicesSection() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("order", { ascending: true });
  if (error) {
    return <p>حدث خطأ أثناء جلب الخدمات.</p>;
  }
  return (
    <section className="container mx-auto px-4 py-12">
      <SectionTitle
        text="خدماتنا"
        desc="اكتشف التصنيفات والخدمات التي نقدمها"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10">
        {categories.map((category, index) => (
          <Link href={`/services`} key={category.id}>
            <div
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="bg-card pt-4 h-full rounded-2xl flex flex-col items-center cursor-pointer"
            >
              <Image
                src={category.image_url}
                alt={`صورة لخدمة ${category.title}`}
                width={200}
                height={200}
                className=" object-cover px-2"
                priority
              />
              <div className="w-3/4 h-[1px] bg-primary mt-4"></div>
              <div className="p-4 text-center">
                <h3 className="text-primary text-sm lg:text-lg font-bold">
                  {category.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
