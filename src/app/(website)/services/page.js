import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import Button from "@/components/ui/button";
import SectionTitle from "@/components/home/SectionTitle";
import Link from "next/link";

export default async function Slider() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");
  if (error) {
    return <p>حدث خطأ أثناء جلب الخدمات.</p>;
  }

  return (
    <section>
      <Hero
        preTitle="معنا،
استثمارك يستحق"
        title="كل ما تحتاجه للنجاح"
        description={[
          "هل أنت جاهز لصنع نجاحك؟",
          "خدمات شاملة تدعم عملك في كافة مراحله",
        ]}
        buttonText="اطلع علي خدماتنا"
        buttonLink="#services"
      />
      <div id="services" className="container mx-auto px-4 py-24 ">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {categories.map((category, i) => (
            <div
              key={category.id}
              data-aos="zoom-in-up"
              data-aos-delay={i * 100}
              className="flex flex-col items-center shadow rounded-lg px-4 py-6"
            >
              <Image
                src={category.image_url}
                alt={category.name}
                width={80}
                height={80}
                className="object-cover"
              />
              <div className="mt-6 text-center space-y-4">
                <h3 className="text-2xl font-semibold">{category.title}</h3>
                <p className="text-md">{category.description}</p>
                <Link
                  href={`/services/${category.id}`}
                  className="bg-accent hover:bg-accent/90   text-maintext px-6 py-2 rounded cursor-pointer transition duration-300"
                >
                  تفاصيل اكثر
                </Link>
              </div>
            </div>
          ))}
        </div>
        <SectionTitle text="شركاء النجاح" />
        <Partners />
      </div>
    </section>
  );
}
