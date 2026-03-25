import { supabase } from "@/lib/supabaseClient";

export default async function sitemap() {
  const baseUrl = "https://www.trafyekbls.com";
  const locales = ["ar", "en"];

  // static routes
  const staticPages = [
    "",
    "/about",
    "/services",
    "/ourwork",
    "/blog",
    "/contact",
    "/terms-conditions",
    "/privacy-policy",
  ];

  const staticRoutes = locales.flatMap((locale) =>
    staticPages.map((path) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.8,
    })),
  );

  // get data from Supabase
  const [{ data: projects }, { data: blogs }, { data: categories }] =
    await Promise.all([
      supabase.from("projects").select("id, created_at"),
      supabase.from("blogs").select("id, created_at"), // افترضت أن اسم الجدول blogs
      supabase.from("categories").select("id, created_at"),
    ]);

  // Links (Our Work, Blog, Services)

  // (Our Work)
  const projectRoutes = locales.flatMap((locale) =>
    (projects || []).map((p) => ({
      url: `${baseUrl}/${locale}/ourwork/${p.id}`,
      lastModified: p.created_at ? new Date(p.created_at) : new Date(),
      priority: 0.7,
    })),
  );

  // (Blog)
  const blogRoutes = locales.flatMap((locale) =>
    (blogs || []).map((b) => ({
      url: `${baseUrl}/${locale}/blog/${b.id}`,
      lastModified: b.created_at ? new Date(b.created_at) : new Date(),
      priority: 0.6,
    })),
  );

  // (Services)
  const serviceRoutes = locales.flatMap((locale) =>
    (services || []).map((s) => ({
      url: `${baseUrl}/${locale}/services/${s.id}`,
      lastModified: s.created_at ? new Date(s.created_at) : new Date(),
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...projectRoutes, ...blogRoutes, ...serviceRoutes];
}
