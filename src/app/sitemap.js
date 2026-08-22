import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { cities } from "@/data/cities";
import { serviceCities } from "@/data/serviceCities";
import { routing } from "@/i18n/routing";

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.trafyekbls.com";

// الصفحات الثابتة الموجودة فعلياً داخل app/[locale]/(website)
const STATIC_PAGES = [
  { path: "", priority: 1.0 },
  { path: "/about-us", priority: 0.8 },
  { path: "/services", priority: 0.8 },
  { path: "/ourwork", priority: 0.8 },
  { path: "/blogs", priority: 0.8 },
  { path: "/contact", priority: 0.8 },
];

// صفحات لها مسار ثابت خاص بها، فلا نكررها من جدول pages
const EXCLUDED_SLUGS = ["about-us"];

export default async function sitemap() {
  const locales = routing.locales;

  // hreflang لكل مسار
  const getAlternates = (path) => ({
    languages: Object.fromEntries(
      locales.map((locale) => [locale, `${BASE_URL}/${locale}${path}`]),
    ),
  });

  const entry = (locale, path, { priority, changeFrequency, lastModified }) => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified: lastModified ?? new Date(),
    changeFrequency,
    priority,
    alternates: getAlternates(path),
  });

  // أول تاريخ متاح من بين الحقول الممررة
  const firstDate = (...values) => {
    for (const value of values) {
      if (!value) continue;
      const date = new Date(value);
      if (!Number.isNaN(date.getTime())) return date;
    }
    return new Date();
  };

  const staticRoutes = locales.flatMap((locale) =>
    STATIC_PAGES.map(({ path, priority }) =>
      entry(locale, path, { priority, changeFrequency: "monthly" }),
    ),
  );

  // updated_at قد يكون غير موجود قبل تشغيل supabase/schema.sql،
  // لذلك نُعيد المحاولة بدونه بدل أن نفقد الروابط من الـ sitemap.
  const select = async (table, key) => {
    const withUpdated = await supabaseAdmin
      .from(table)
      .select(`${key}, updated_at, created_at`);
    if (!withUpdated.error) return withUpdated;
    return supabaseAdmin.from(table).select(`${key}, created_at`);
  };

  const [projectsRes, blogsRes, categoriesRes, pagesRes] = await Promise.all([
    select("projects", "id"),
    select("blogs", "id"),
    select("categories", "id"),
    select("pages", "slug"),
  ]);

  for (const [name, res] of Object.entries({
    projects: projectsRes,
    blogs: blogsRes,
    categories: categoriesRes,
    pages: pagesRes,
  })) {
    if (res.error) console.error(`sitemap: failed to load ${name}`, res.error);
  }

  const projects = projectsRes.data || [];
  const blogs = blogsRes.data || [];
  const categories = categoriesRes.data || [];
  const pages = pagesRes.data || [];

  const projectRoutes = locales.flatMap((locale) =>
    projects.map((project) =>
      entry(locale, `/ourwork/${project.id}`, {
        priority: 0.7,
        changeFrequency: "weekly",
        lastModified: firstDate(project.updated_at, project.created_at),
      }),
    ),
  );

  const blogRoutes = locales.flatMap((locale) =>
    blogs.map((blog) =>
      entry(locale, `/blogs/${blog.id}`, {
        priority: 0.6,
        changeFrequency: "weekly",
        lastModified: firstDate(blog.updated_at, blog.created_at),
      }),
    ),
  );

  const serviceRoutes = locales.flatMap((locale) =>
    categories.map((service) =>
      entry(locale, `/services/${service.id}`, {
        priority: 0.7,
        changeFrequency: "weekly",
        lastModified: firstDate(service.updated_at, service.created_at),
      }),
    ),
  );

  // صفحات الخدمة + المدينة: لا ندرج إلا ما له محتوى فعلي في serviceCities
  const serviceCityRoutes = locales.flatMap((locale) =>
    categories.flatMap((service) => {
      const content = serviceCities[service.id];
      if (!content) return [];

      return cities
        .filter((city) => content[city.slug])
        .map((city) =>
          entry(locale, `/services/${service.id}/${city.slug}`, {
            priority: 0.8,
            changeFrequency: "monthly",
            lastModified: firstDate(service.updated_at, service.created_at),
          }),
        );
    }),
  );

  const pageRoutes = locales.flatMap((locale) =>
    pages
      .filter((page) => page.slug && !EXCLUDED_SLUGS.includes(page.slug))
      .map((page) =>
        entry(locale, `/pages/${page.slug}`, {
          priority: 0.5,
          changeFrequency: "monthly",
          lastModified: firstDate(page.updated_at, page.created_at),
        }),
      ),
  );

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...blogRoutes,
    ...serviceRoutes,
    ...serviceCityRoutes,
    ...pageRoutes,
  ];
}
