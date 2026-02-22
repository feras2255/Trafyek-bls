// app/sitemap.js
import { supabase } from "@/lib/supabaseClient";

export default async function sitemap() {
  const baseUrl = "https://www.trafyekbls.com";

  // الصفحات الثابتة
  const staticRoutes = [
    { path: "", name: "الرئيسية" },
    { path: "/about", name: "عن الشركة" },
    { path: "/services", name: "خدماتنا" },
    { path: "/projects", name: "مشاريعنا" },
    { path: "/contact", name: "اتصل بنا" },
    { path: "/terms-conditions", name: "الشروط والأحكام" },
    { path: "/privacy-policy", name: "سياسة الخصوصية" },
  ].map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
  }));

  // جلب البيانات الديناميكية من Supabase
  const [
    { data: projects },
    { data: products },
    { data: categories },
    { data: services },
  ] = await Promise.all([
    supabase.from("projects").select("id, created_at"),
    supabase.from("products").select("id, created_at"),
    supabase.from("categories").select("id, created_at"),
    supabase.from("services").select("id, created_at"),
  ]);

  // الروابط الديناميكية
  const projectRoutes =
    projects?.map((p) => ({
      url: `${baseUrl}/projects/${p.id}`,
      lastModified: p.created_at ? new Date(p.created_at) : new Date(),
    })) ?? [];

  const productRoutes =
    products?.map((p) => ({
      url: `${baseUrl}/products/${p.id}`,
      lastModified: p.created_at ? new Date(p.created_at) : new Date(),
    })) ?? [];

  const categoryRoutes =
    categories?.map((c) => ({
      url: `${baseUrl}/categories/${c.id}`,
      lastModified: c.created_at ? new Date(c.created_at) : new Date(),
    })) ?? [];

  const serviceRoutes =
    services?.map((s) => ({
      url: `${baseUrl}/services/${s.id}`,
      lastModified: s.created_at ? new Date(s.created_at) : new Date(),
    })) ?? [];

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...serviceRoutes,
  ];
}
