// import { supabase } from "@/lib/supabaseClient";
// import Image from "next/image";
// import SectionTitle from "./SectionTitle";
// import { getTranslations } from "next-intl/server";

// export default async function Partners() {
//   const t = await getTranslations("partners");
//   const { data: partners, error } = await supabase
//     .from("partners")
//     .select("*")
//     .order("order", { ascending: true });
//   if (error) {
//     return <p>حدث خطأ أثناء جلب الخدمات.</p>;
//   }
//   return (
//     <section className="container mx-auto px-4 lg:px-6">
//       <SectionTitle text={t("title")} desc={t("description")} />

//       <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-x-5 md:gap-y-12">
//         {partners.map((partner, index) => (
//           <div
//             key={partner.id}
//             data-aos="zoom-in"
//             data-aos-delay={index * 100}
//             className="relative w-full h-10 md:h-14 lg:h-20 pt-2 border border-border rounded-lg flex flex-col items-center cursor-pointer overflow-hidden"
//           >
//             <Image
//               src={partner.image_url}
//               alt={`partner${partner.id}`}
//               fill
//               sizes="120px"
//               className=" object-cover rounded-lg"
//               priority
//             />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import { supabase } from "@/lib/supabaseClient";
import SectionTitle from "./SectionTitle";
import { getTranslations } from "next-intl/server";
import PartnersSlider from "./PartnersSlider";

export default async function Partners() {
  const t = await getTranslations("partners");
  const { data: partners, error } = await supabase
    .from("partners")
    .select("*")
    .order("order", { ascending: true });

  if (error || !partners || partners.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 lg:px-6 py-12">
      <SectionTitle text={t("title")} desc={t("description")} />

      <PartnersSlider partners={partners} />
    </section>
  );
}
