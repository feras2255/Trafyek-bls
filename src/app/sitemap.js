import { supabaseAdmin } from "@/lib/supabaseAdmin";

// Was force-dynamic, so every crawler hit re-queried four tables. Content
// changes rarely; regenerate hourly instead.
export const revalidate = 3600;

const BASE_URL = "https://www.trafyekbls.com";
const LOCALES = ["ar", "en"];

/**
 * Builds the two locale entries for one path, each carrying the full
 * hreflang set.
 *
 * The sitemap previously emitted no `alternates` at all, so the ar/en pairing
 * was declared only in each page's <head>. Google accepts either channel, but
 * the sitemap one is the more reliable of the two for a bilingual site because
 * it does not depend on the page being crawled and rendered first. Both are
 * now present and they agree.
 *
 * `lastModified` is omitted when we do not actually know it. It used to be
 * `new Date()` on every static route, which told crawlers that every page on
 * the site changed the moment the sitemap regenerated — a claim that is false
 * every hour, and one Google learns to discount. No value is better than a
 * value that is always wrong.
 */
function entriesFor(path, { lastModified, changeFrequency, priority }) {
  const languages = Object.fromEntries(
    LOCALES.map((l) => [l, `${BASE_URL}/${l}${path}`]),
  );
  // x-default points at the Arabic version: it is the site's default locale in
  // i18n/routing and the primary market is Saudi Arabia.
  languages["x-default"] = `${BASE_URL}/ar${path}`;

  return LOCALES.map((locale) => ({
    url: `${BASE_URL}/${locale}${path}`,
    ...(lastModified ? { lastModified } : {}),
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

/** Prefers updated_at, falls back to created_at, and gives up rather than lie. */
function knownDate(row) {
  if (row?.updated_at) return new Date(row.updated_at);
  if (row?.created_at) return new Date(row.created_at);
  return undefined;
}

export default async function sitemap() {
  // No lastModified: these are code-defined pages, and the database has no
  // modification date for them.
  const staticPages = [
    { path: "", priority: 1 },
    { path: "/about-us", priority: 0.8 },
    { path: "/services", priority: 0.8 },
    { path: "/ourwork", priority: 0.8 },
    { path: "/blogs", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
  ];

  const staticRoutes = staticPages.flatMap(({ path, priority }) =>
    entriesFor(path, { changeFrequency: "monthly", priority }),
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
    supabaseAdmin.from("blogs").select("id, created_at"),
    supabaseAdmin.from("categories").select("id, created_at"),
    supabaseAdmin.from("pages").select("slug, updated_at, created_at"),
  ]);

  // City pages, published only. Wrapped because city_pages does not exist until
  // migration 008 runs, and a missing table must not take down the sitemap.
  let cities = [];
  try {
    const { data, error } = await supabaseAdmin
      .from("city_pages")
      .select("slug, updated_at, created_at")
      .eq("is_published", true);
    if (!error) cities = data ?? [];
  } catch {
    cities = [];
  }

  const cityRoutes = cities.flatMap((c) =>
    entriesFor(`/cities/${c.slug}`, {
      lastModified: knownDate(c),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const projectRoutes = (projects || []).flatMap((p) =>
    entriesFor(`/ourwork/${p.id}`, {
      lastModified: knownDate(p),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const blogRoutes = (blogs || []).flatMap((b) =>
    entriesFor(`/blogs/${b.id}`, {
      lastModified: knownDate(b),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  const serviceRoutes = (categories || []).flatMap((s) =>
    entriesFor(`/services/${s.id}`, {
      lastModified: knownDate(s),
      changeFrequency: "monthly",
      priority: 0.7,
    }),
  );

  const pageRoutes = (pages || [])
    .filter((p) => p.slug && !excludedSlugs.includes(p.slug))
    .flatMap((p) =>
      entriesFor(`/pages/${p.slug}`, {
        lastModified: knownDate(p),
        changeFrequency: "monthly",
        priority: 0.5,
      }),
    );

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...blogRoutes,
    ...serviceRoutes,
    ...pageRoutes,
    ...cityRoutes,
  ];
}
