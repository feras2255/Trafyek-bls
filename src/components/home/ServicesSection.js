import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import SectionTitle from "./SectionTitle";
import Link from "next/link";

export default async function ServicesSection() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");
  if (error) {
    return <p>حدث خطأ أثناء جلب الخدمات.</p>;
  }
  return (
    <section className="container mx-auto px-4 py-12">
      <SectionTitle
        text="خدماتنا"
        desc="اكتشف التصنيفات والخدمات التي نقدمها"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-6 mt-10">
        {categories.map((category, index) => (
          <div
            key={category.id}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="flex flex-col items-center cursor-pointer"
          >
            <Image
              src={category.image_url}
              alt={`صورة لخدمة ${category.title}`}
              width={100}
              height={100}
              className=" object-cover transition-transform duration-500 group-hover:scale-110"
              priority
            />
            <div className="p-4 text-center">
              <h3 className="text-primary text-lg font-bold pb-2">
                {category.title}
              </h3>
              <p className="text-muted-foreground text-md mb-6">
                {category.description || "لا يوجد وصف متاح"}
              </p>
              <Link
                href={`/services/${category.id}`}
                className="bg-primary hover:bg-primary/90  text-maintext px-6 py-2 rounded cursor-pointer transition duration-300"
              >
                اعرف المزيد
              </Link>
            </div>
            <div className="w-full h-[1px] bg-primary mt-4"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
