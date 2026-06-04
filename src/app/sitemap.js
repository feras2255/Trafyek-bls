import { supabaseAdmin } from "@/lib/supabaseAdmin";
export const dynamic = "force-dynamic";
export default async function sitemap() {
  const baseUrl = "https://www.trafyekbls.com";
  const locales = ["ar", "en"];

  // Static routes
  const staticPages = [
    { path: "", priority: 1 },
    { path: "/about-us", priority: 0.8 },
    { path: "/services", priority: 0.8 },
    { path: "/ourwork", priority: 0.8 },
    { path: "/blog", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
  ];

  const staticRoutes = locales.flatMap((locale) =>
    staticPages.map(({ path, priority }) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority,
    })),
  );

  // الصفحات التي لها مسار ثابت ولا نريد تكرارها من DB
  const excludedSlugs = ["about-us"];

  const [
    { data: projects },
    { data: blogs },
    { data: categories },
    { data: pages },
  ] = await Promise.all([
    supabaseAdmin.from("projects").select("id, updated_at, created_at"),
    supabaseAdmin.from("blogs").select("id, updated_at, created_at"),
    supabaseAdmin.from("categories").select("id, updated_at, created_at"),
    supabaseAdmin.from("pages").select("slug, updated_at, created_at"),
  ]);

  const projectRoutes = locales.flatMap((locale) =>
    (projects || []).map((p) => ({
      url: `${baseUrl}/${locale}/ourwork/${p.id}`,
      lastModified: p.updated_at
        ? new Date(p.updated_at)
        : p.created_at
          ? new Date(p.created_at)
          : new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    })),
  );

  const blogRoutes = locales.flatMap((locale) =>
    (blogs || []).map((b) => ({
      url: `${baseUrl}/${locale}/blogs/${b.id}`,
      lastModified: b.updated_at
        ? new Date(b.updated_at)
        : b.created_at
          ? new Date(b.created_at)
          : new Date(),
      changeFrequency: "daily",
      priority: 0.6,
    })),
  );

  const serviceRoutes = locales.flatMap((locale) =>
    (categories || []).map((s) => ({
      url: `${baseUrl}/${locale}/services/${s.id}`,
      lastModified: s.updated_at
        ? new Date(s.updated_at)
        : s.created_at
          ? new Date(s.created_at)
          : new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    })),
  );

  // ✅ Pages - ديناميكي من DB مع استثناء الصفحات الثابتة
  const pageRoutes = locales.flatMap((locale) =>
    (pages || [])
      .filter((p) => p.slug && !excludedSlugs.includes(p.slug))
      .map((p) => ({
        url: `${baseUrl}/${locale}/${p.slug}`,
        lastModified: p.updated_at
          ? new Date(p.updated_at)
          : p.created_at
            ? new Date(p.created_at)
            : new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      })),
  );

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...blogRoutes,
    ...serviceRoutes,
    ...pageRoutes,
  ];
}
