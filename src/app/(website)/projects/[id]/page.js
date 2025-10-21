import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export default async function ProjectDetails({ params }) {
  const { id } = params;

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg text-gray-600">
        لم يتم العثور على هذا المشروع.
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 container mx-auto px-6">
      <div className="space-y-6">
        {project.image_url && (
          <div className="relative w-full h-72 md:h-96 rounded-lg">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-contain rounded-lg"
            />
          </div>
        )}
        <div className="space-y-6 mt-10">
          <h1 className="text-3xl md:text-5xl font-bold text-primary">
            {project.title}
          </h1>

          <div
            className="prose max-w-none text-secondarytext leading-relaxed"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />
        </div>
      </div>
    </section>
  );
}
