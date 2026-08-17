// Content changes rarely; 0 forced a DB round-trip on every request.
export const revalidate = 3600;
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import {
  FiExternalLink,
  FiArrowRight,
  FiArrowLeft,
  FiLayers,
} from "react-icons/fi";
import PageHero from "@/components/ui/PageHero";
import { buildMetadata, breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/seo";
import { siteSettings } from "@/lib/siteSettings";
import { sanitize } from "@/lib/sanitize";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";

  const { data: project } = await supabase
    .from("projects")
    .select("title_ar, title_en, description_ar, description_en, image_url")
    .eq("id", id)
    .single();

  if (!project) {
    return {
      title: isAr ? "المشروع غير موجود" : "Project not found",
      robots: { index: false, follow: true },
    };
  }

  const title = isAr ? project.title_ar : project.title_en;
  const description = (isAr ? project.description_ar : project.description_en)
    ?.replace(/<[^>]*>?/gm, "")
    ?.trim()
    ?.slice(0, 160);

  return buildMetadata({
    locale,
    path: `/ourwork/${id}`,
    title,
    description,
    type: "article",
    images: project.image_url
      ? [{ url: project.image_url, width: 1200, height: 630, alt: title }]
      : undefined,
  });
}

export default async function ProjectDetails({ params }) {
  const { id } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";
  const settings = await siteSettings();
  const waNumber = settings?.whatsapp?.replace(/[^\d]/g, "");

  const { data: project, error } = await supabase
    .from("projects")
    .select("*, categories(title_ar, title_en)")
    .eq("id", id)
    .single();

  if (error || !project) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-500 font-bold">
          {isAr ? "المشروع غير موجود" : "Project not found"}
        </p>
        <Link href="/ourwork" className="text-primary underline">
          {isAr ? "العودة للمشاريع" : "Back to projects"}
        </Link>
      </div>
    );
  }

  // get project details
  const title = isAr ? project.title_ar : project.title_en || project.title;
  const description = isAr
    ? project.description_ar
    : project.description_en || "";
  const categoryName = project.categories
    ? isAr
      ? project.categories.title_ar
      : project.categories.title_en
    : isAr
      ? "عام"
      : "General";

  const breadcrumb = [
    { label: isAr ? "أعمالنا" : "Portfolio", href: "/ourwork" },
    { label: title, href: null },
  ];

  return (
    <main className="bg-[#fcfcfc] min-h-screen">
      {/* The page rendered a visual breadcrumb but emitted no BreadcrumbList,
          so search engines could not read the hierarchy the visitor could see.
          CreativeWork describes the case study itself and points at the
          Organization node rather than repeating a partial copy of it. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            {
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: title,
              url: `${SITE_URL}/${locale}/ourwork/${id}`,
              ...(description ? { description } : {}),
              ...(project.image_url ? { image: project.image_url } : {}),
              ...(categoryName ? { genre: categoryName } : {}),
              inLanguage: isAr ? "ar-SA" : "en-US",
              creator: { "@id": `${SITE_URL}/#organization` },
            },
            breadcrumbSchema({
              locale,
              items: [
                { name: isAr ? "الرئيسية" : "Home", path: "" },
                { name: isAr ? "أعمالنا" : "Portfolio", path: "/ourwork" },
                { name: title },
              ],
            }),
          ),
        }}
      />

      {/*  Page Hero*/}
      <PageHero
        title={title}
        description={
          isAr
            ? "تفاصيل المشروع والحلول المنفذة"
            : "Project details and implemented solutions"
        }
        breadcrumbData={breadcrumb}
        isAr={isAr}
        whatsapp={waNumber}
      />

      {/* 2. Project Showcase Section */}
      <section className="relative mt-20 pb-24 z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* image */}

            <div className="group relative  rounded-2xl md:rounded-[2rem] shadow-2xl shadow-black/5 border border-gray-100 overflow-hidden">
              <div className="relative w-full h-48 md:h-80  overflow-hidden">
                <Image
                  src={project.image_url}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            </div>

            {/* project information*/}
            <div className=" flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-primary font-black text-sm uppercase tracking-widest bg-primary/10 px-4 py-2 rounded-xl">
                  <FiLayers />
                  {isAr ? "عن المشروع" : "About Project"}
                </div>
                <h2 className="text-3xl lg:text-4xl font-black text-accent leading-tight">
                  {title}
                </h2>
                <div
                  className="text-subtext text-lg leading-relaxed prose prose-slate"
                  dangerouslySetInnerHTML={{ __html: sanitize(description) }}
                />
              </div>

              {/*project link */}
              {project.project_link && (
                <div className="pt-6">
                  <a
                    href={project.project_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      isAr ? "زيارة الموقع المباشر" : "Visit Live Website"
                    }
                    className="inline-flex items-center justify-center gap-3 bg-accent text-white px-8 py-5 rounded-2xl font-black text-lg shadow-xl shadow-accent/20 hover:bg-primary  transition-all duration-300 group w-full md:w-auto"
                  >
                    {isAr ? "زيارة الموقع المباشر" : "Visit Live Website"}
                    <FiExternalLink className="group-hover:rotate-12 transition-transform" />
                  </a>
                </div>
              )}

              {/* categories and year   */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    {isAr ? "التصنيف" : "Category"}
                  </p>
                  <p className="text-accent font-bold">{categoryName} </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase">
                    {isAr ? "سنة التنفيذ" : "Year"}
                  </p>
                  <p className="text-accent font-bold">2026</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Bottom Navigation */}
      <footer className="container mx-auto px-4 py-12 border-t border-gray-100">
        <Link
          href="/ourwork"
          aria-label={isAr ? "العودة إلى معرض الأعمال" : "Back to Portfolio"}
          className="flex items-center gap-3 text-subtext hover:text-primary font-bold transition-colors group"
        >
          {isAr ? "العودة إلى معرض الأعمال" : "Back to Portfolio"}
          {isAr ? (
            <FiArrowLeft className="group-hover:translate-x-2 transition-transform" />
          ) : (
            <FiArrowRight className="group-hover:-translate-x-2 transition-transform" />
          )}
        </Link>
      </footer>
    </main>
  );
}
