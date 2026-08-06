// import { supabaseAdmin } from "@/lib/supabaseAdmin";
// export const dynamic = "force-dynamic";
// export default async function sitemap() {
//   const baseUrl = "https://www.trafyekbls.com";
//   const locales = ["ar", "en"];

//   // Static routes
//   const staticPages = [
//     { path: "", priority: 1 },
//     { path: "/about-us", priority: 0.8 },
//     { path: "/services", priority: 0.8 },
//     { path: "/ourwork", priority: 0.8 },
//     { path: "/blog", priority: 0.8 },
//     { path: "/contact", priority: 0.8 },
//   ];

//   const staticRoutes = locales.flatMap((locale) =>
//     staticPages.map(({ path, priority }) => ({
//       url: `${baseUrl}/${locale}${path}`,
//       lastModified: new Date(),
//       changeFrequency: "monthly",
//       priority,
//     })),
//   );

//   // الصفحات التي لها مسار ثابت ولا نريد تكرارها من DB
//   const excludedSlugs = ["about-us"];

//   const [
//     { data: projects },
//     { data: blogs },
//     { data: categories },
//     { data: pages },
//   ] = await Promise.all([
//     supabaseAdmin.from("projects").select("id, updated_at, created_at"),
//     supabaseAdmin.from("blogs").select("id, created_at"),
//     supabaseAdmin.from("categories").select("id, created_at"),
//     supabaseAdmin.from("pages").select("slug, updated_at, created_at"),
//   ]);

//   const projectRoutes = locales.flatMap((locale) =>
//     (projects || []).map((p) => ({
//       url: `${baseUrl}/${locale}/ourwork/${p.id}`,
//       lastModified: p.updated_at
//         ? new Date(p.updated_at)
//         : p.created_at
//           ? new Date(p.created_at)
//           : new Date(),
//       changeFrequency: "daily",
//       priority: 0.7,
//     })),
//   );

//   const blogRoutes = locales.flatMap((locale) =>
//     (blogs || []).map((b) => ({
//       url: `${baseUrl}/${locale}/blogs/${b.id}`,
//       lastModified: b.created_at ? new Date(b.created_at) : new Date(),
//       changeFrequency: "daily",
//       priority: 0.6,
//     })),
//   );

//   const serviceRoutes = locales.flatMap((locale) =>
//     (categories || []).map((s) => ({
//       url: `${baseUrl}/${locale}/services/${s.id}`,
//       lastModified: s.created_at ? new Date(s.created_at) : new Date(),
//       changeFrequency: "daily",
//       priority: 0.7,
//     })),
//   );

//   //  Pages
//   const pageRoutes = locales.flatMap((locale) =>
//     (pages || [])
//       .filter((p) => p.slug && !excludedSlugs.includes(p.slug))
//       .map((p) => ({
//         url: `${baseUrl}/${locale}/${p.slug}`,
//         lastModified: p.updated_at
//           ? new Date(p.updated_at)
//           : p.created_at
//             ? new Date(p.created_at)
//             : new Date(),
//         changeFrequency: "monthly",
//         priority: 0.5,
//       })),
//   );

//   return [
//     ...staticRoutes,
//     ...projectRoutes,
//     ...blogRoutes,
//     ...serviceRoutes,
//     ...pageRoutes,
//   ];
// }

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const baseUrl = "https://www.trafyekbls.com";

  // قائمة بجميع اللغات المدعومة
  const locales = ["ar", "en", "fr", "de", "es", "it", "tr", "hi", "bn", "ur"];

  // الصفحات الثابتة
  const staticPages = [
    { path: "", priority: 1.0 },
    { path: "/about-us", priority: 0.8 },
    { path: "/services", priority: 0.8 },
    { path: "/ourwork", priority: 0.8 },
    { path: "/blog", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
  ];

  // دالة مساعدة لإنشاء روابط اللغات البديلة (hreflang) لكل رابط
  const getAlternates = (path) => {
    const languages = {};
    locales.forEach((loc) => {
      languages[loc] = `${baseUrl}/${loc}${path}`;
    });
    return { languages };
  };

  const staticRoutes = locales.flatMap((locale) =>
    staticPages.map(({ path, priority }) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority,
      alternates: getAlternates(path),
    })),
  );

  const excludedSlugs = ["about-us"];

  const [
    { data: projects },
    { data: blogs },
    { data: categories },
    { data: pages },
  ] = await Promise.all([
    supabaseAdmin.from("projects").select("id, updated_at, created_at"),
    supabaseAdmin.from("blogs").select("id, created_at"),
    supabaseAdmin.from("categories").select("id, created_at"),
    supabaseAdmin.from("pages").select("slug, updated_at, created_at"),
  ]);

  const projectRoutes = locales.flatMap((locale) =>
    (projects || []).map((p) => {
      const path = `/ourwork/${p.id}`;
      return {
        url: `${baseUrl}/${locale}${path}`,
        lastModified: p.updated_at
          ? new Date(p.updated_at)
          : p.created_at
            ? new Date(p.created_at)
            : new Date(),
        changeFrequency: "daily",
        priority: 0.7,
        alternates: getAlternates(path),
      };
    }),
  );

  const blogRoutes = locales.flatMap((locale) =>
    (blogs || []).map((b) => {
      const path = `/blogs/${b.id}`;
      return {
        url: `${baseUrl}/${locale}${path}`,
        lastModified: b.created_at ? new Date(b.created_at) : new Date(),
        changeFrequency: "daily",
        priority: 0.6,
        alternates: getAlternates(path),
      };
    }),
  );

  const serviceRoutes = locales.flatMap((locale) =>
    (categories || []).map((s) => {
      const path = `/services/${s.id}`;
      return {
        url: `${baseUrl}/${locale}${path}`,
        lastModified: s.created_at ? new Date(s.created_at) : new Date(),
        changeFrequency: "daily",
        priority: 0.7,
        alternates: getAlternates(path),
      };
    }),
  );

  const pageRoutes = locales.flatMap((locale) =>
    (pages || [])
      .filter((p) => p.slug && !excludedSlugs.includes(p.slug))
      .map((p) => {
        const path = `/${p.slug}`;
        return {
          url: `${baseUrl}/${locale}${path}`,
          lastModified: p.updated_at
            ? new Date(p.updated_at)
            : p.created_at
              ? new Date(p.created_at)
              : new Date(),
          changeFrequency: "monthly",
          priority: 0.5,
          alternates: getAlternates(path),
        };
      }),
  );

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...blogRoutes,
    ...serviceRoutes,
    ...pageRoutes,
  ];
}
