export const revalidate = 0;
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

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
    <section className="py-24 md:py-36">
      <div className="container mx-auto px-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="w-full h-52 md:h-96 relative">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover rounded-lg mb-6"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <div
              className="text-fourth px-3"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
            {project.project_link && (
              <Link
                href={project.project_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-third/80 text-lg md:text-xl font-bold underline hover:text-third px-4 transition-colors duration-300 ease-in-out"
              >
                تصفح المشروع
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
