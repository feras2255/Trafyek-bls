"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("id, title, description, project_link, image_url")
          .order("id", { ascending: false });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("فشل جلب المشاريع. حاول لاحقًا.");
      } finally {
        setLoading(false);
        // refresh AOS positions after data loads
        setTimeout(() => {
          if (AOS && typeof AOS.refresh === "function") AOS.refresh();
        }, 100);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-card rounded-lg p-4 h-48 flex flex-col"
            >
              <div className="bg-gray-200 h-28 rounded-md mb-3" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <p className="text-md md:text-3xl text-muted-foreground">
          لا توجد مشاريع بعد.
        </p>
      </div>
    );
  }

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6">
          {projects.map((p, idx) => (
            <article
              key={p.id}
              data-aos="fade-up"
              data-aos-delay={idx * 80}
              className="bg-card rounded-lg overflow-hidden shadow-md flex flex-col"
            >
              <Link href={`/projects/${p.id}`}>
                <div>
                  {p.image_url ? (
                    <div className="h-36 md:h-72 w-full relative overflow-hidden bg-gray-100">
                      <Image
                        src={p?.image_url}
                        alt={p.title || "project image"}
                        fill
                        // sizes="100vw"
                        className=" object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-36 md:h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400">
                      لا توجد صورة
                    </div>
                  )}
                </div>
              </Link>
              <div className="px-2 py-3 md:p-4 flex-1 flex flex-col">
                <h3 className="text-md md:text-2xl font-semibold mb-2  text-primary">
                  {p.title}
                </h3>

                <p className="text-sm text-secondarytext mb-4 line-clamp-2 md:line-clamp-3 flex-1">
                  {p.description || "لا يوجد وصف للمشروع."}
                </p>

                <div className="flex items-center justify-between">
                  <a
                    href={p.project_link || "#"}
                    target={p.project_link ? "_blank" : "_self"}
                    rel="noreferrer"
                    className={`text-sm font-medium px-3 py-1 rounded ${
                      p.project_link
                        ? "bg-primary text-maintext hover:opacity-90"
                        : "bg-border text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    عرض المشروع
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
