import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export default async function ServiceDetails({ params }) {
  const { id } = params;

  const { data: category, error } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        لم يتم العثور على تفاصيل هذه الخدمة.
      </div>
    );
  }

  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("category_id", id);

  const hasProjects = projects && projects.length > 0;

  return (
    <section className="min-h-screen py-20 container mx-auto px-6">
      <div className="w-full space-y-6">
        <h1 className="text-4xl font-bold text-primary">{category.title}</h1>

        <div
          className="px-2 space-y-4"
          dangerouslySetInnerHTML={{ __html: category.long_description }}
        />
      </div>

      <div className="space-y-8">
        <h2 className="text-2xl font-semibold text-primary">
          مشاريعنا في هذا المجال
        </h2>

        {!hasProjects ? (
          <p className="text-gray-500">لا توجد مشاريع حالياً في هذا القسم.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className=" overflow-hidden rounded-2xl">
                <Image
                  src={project.image_url}
                  alt={project.title}
                  width={500}
                  height={500}
                  className=" object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
