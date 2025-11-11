export const revalidate = 0;

import { supabase } from "@/lib/supabaseClient";
import Showcase from "@/components/showcase/Showcase";

export default async function Projects() {
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*");
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*");

  if (error) {
    console.error("خطأ أثناء جلب المشاريع:", error);
    return (
      <section className="py-20">
        <div className="container mx-auto text-center text-red-500">
          حدث خطأ أثناء تحميل المشاريع. يرجى المحاولة لاحقًا.
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <div className="relative overflow-hidden py-24 bg-black flex flex-col items-center justify-center px-6">
        <div className="absolute bottom-0 right-0 w-[300px] h-[150px] bg-[#8755f0] blur-[180px] rounded-full pointer-events-none"></div>

        <div className="absolute bottom-0 left-0 w-[300px] h-[150px] bg-[#8755f0] blur-[180px] rounded-full pointer-events-none"></div>

        <div className="container mx-auto mt-20 space-y-6" data-aos="fade-up">
          <h1
            className="text-2xl md:text-6xl font-extrabold text-secondary leading-snug"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            نُحوِّل الأفكار إلى إنجازات واقعية
          </h1>

          <p
            className="text-base md:text-2xl text-maintext mb-2 text-justify"
            data-aos="fade-up"
            data-aos-delay={300}
          >
            نقدم حلولًا مبتكرة مصممة بدقة لتلائم احتياجك. هنا نعرض مجموعـة من
            المشاريع التي نفخر بتنفيذها، والتي تعكس جودة عملنا واحترافيتنا في
            تحقيق رؤية عملائنا على أرض الواقع.{" "}
          </p>
        </div>
      </div>
      <Showcase categories={categories} items={projects} />;
    </section>
  );
}
