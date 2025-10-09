// app/sitemap.js
import { supabase } from "@/lib/supabaseClient";

export default async function sitemap() {
  const baseUrl = "https://www.trafyekbls.com";

  const staticRoutes = [
    { path: "", name: "الرئيسية" },
    { path: "/about", name: "عن الشركة" },
    { path: "/services", name: "خدماتنا" },
    { path: "/projects", name: "مشاريعنا" },
    { path: "/contact", name: "اتصل بنا" },
  ].map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
  }));

  const [{ data: projects }, { data: products }, { data: categories }] =
    await Promise.all([
      supabase.from("projects").select("id, name, created_at"),
      supabase.from("products").select("id, name, created_at"),
      supabase.from("categories").select("id, name, created_at"),
    ]);

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

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...productRoutes,
    ...categoryRoutes,
  ];
}
