import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default async function Projects() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, description, project_link, image_url")
    .order("id", { ascending: false });

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

  if (!projects || projects.length === 0) {
    return (
      <section className="py-20">
        <div className="container mx-auto text-center text-gray-500">
          لا توجد مشاريع حالياً.
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
            className="text-3xl md:text-6xl font-extrabold text-secondary leading-snug"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            نُحوِّل الأفكار إلى إنجازات واقعية
          </h1>

          <p
            className="text-base md:text-2xl text-maintext mb-2"
            data-aos="fade-up"
            data-aos-delay={300}
          >
            نقدم حلولًا مبتكرة مصممة بدقة لتلائم احتياجك. هنا نعرض مجموعـة من
            المشاريع التي نفخر بتنفيذها، والتي تعكس جودة عملنا واحترافيتنا في
            تحقيق رؤية عملائنا على أرض الواقع.{" "}
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, idx) => (
            <article
              key={p.id}
              data-aos="fade-up"
              data-aos-delay={idx * 80}
              className="bg-card rounded-lg overflow-hidden shadow-md flex flex-col"
            >
              <Link href={`/projects/${p.id}`}>
                {p.image_url ? (
                  <div className="h-56 w-full relative overflow-hidden bg-gray-100">
                    <Image
                      src={p.image_url}
                      alt={p.title || "صورة المشروع"}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-56 w-full bg-gray-100 flex items-center justify-center text-gray-400">
                    لا توجد صورة
                  </div>
                )}
              </Link>

              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-primary">
                  {p.title}
                </h3>

                <div
                  className="px-2 space-y-4 leading-relaxed text-secondarytext line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: p.description }}
                />

                <div className="flex items-center justify-between mt-4">
                  <Link
                    href={`/projects/${p.id}`}
                    target={p.project_link ? "_blank" : "_self"}
                    rel="noreferrer"
                    className={`text-sm font-medium px-3 py-1 rounded transition bg-primary text-maintext hover:opacity-90`}
                  >
                    اقراء المزيد
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
