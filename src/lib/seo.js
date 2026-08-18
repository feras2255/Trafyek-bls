import { routing } from "@/i18n/routing";

export const SITE_URL = "https://www.trafyekbls.com";
export const SITE_NAME_AR = "ترافيك بلس";
export const SITE_NAME_EN = "Traffic Plus";

/**
 * Per-page canonical and hreflang.
 *
 * These used to live as static strings on the root layout's metadata, which
 * Next.js inherits into every page that does not define its own. The result,
 * verified in the rendered HTML, was that /ar/ourwork, /en/ourwork, the blog
 * index, every project page, every CMS page and the English home page all
 * emitted `<link rel="canonical" href="https://www.trafyekbls.com/ar">` —
 * each one telling Google it was a duplicate of the Arabic home page.
 *
 * @param locale current locale
 * @param path   route path WITHOUT the locale prefix, e.g. "/ourwork" or ""
 */
export function alternatesFor(locale, path = "") {
  const clean = path && !path.startsWith("/") ? `/${path}` : path;

  const languages = {};
  for (const code of routing.locales) {
    languages[code] = `${SITE_URL}/${code}${clean}`;
  }
  // Tells search engines which version to serve when no locale matches.
  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${clean}`;

  return {
    canonical: `${SITE_URL}/${locale}${clean}`,
    languages,
  };
}

/**
 * Builds a page's metadata with the canonical and hreflang already correct.
 * Every page should go through this rather than hand-writing alternates.
 */
export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  images,
  type = "website",
  keywords,
  extra = {},
}) {
  const isAr = locale === "ar";
  const url = `${SITE_URL}/${locale}${path && !path.startsWith("/") ? `/${path}` : path}`;
  // No default image here on purpose. This used to fall back to
  // "/og-image.jpg", a file that does not exist in public/ — so every page
  // without its own image asked crawlers for a 404 and rendered a blank share
  // card. Leaving it undefined lets the generated opengraph-image.js route
  // apply instead. Pass `images` explicitly when a page has a real one.
  const ogImages = images;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: alternatesFor(locale, path),
    openGraph: {
      title,
      description,
      url,
      siteName: isAr ? SITE_NAME_AR : SITE_NAME_EN,
      images: ogImages,
      locale: isAr ? "ar_SA" : "en_US",
      type,
    },
    twitter: { card: "summary_large_image", title, description, images: ogImages },
    ...extra,
  };
}

/* ------------------------------------------------------------------ *
 * Structured data
 *
 * The site had Article, Service and ContactPage schema on three pages and
 * nothing else — no Organization, no WebSite, no LocalBusiness and no
 * BreadcrumbList, despite selling local SEO as a service.
 *
 * Every builder below only emits fields it was actually given. Inventing a
 * rating, a review count or an address would be fabricated structured data,
 * which is a manual-action risk, so absent input means an absent field.
 * ------------------------------------------------------------------ */

export function organizationSchema({ locale, settings }) {
  const isAr = locale === "ar";

  const sameAs = [
    settings?.instagram,
    settings?.tiktok,
    settings?.snapchat,
    settings?.x_account,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: isAr ? SITE_NAME_AR : SITE_NAME_EN,
    url: `${SITE_URL}/${locale}`,
    ...(settings?.image_url ? { logo: settings.image_url } : {}),
    ...(settings?.email ? { email: settings.email } : {}),
    ...(settings?.phone ? { telephone: settings.phone } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function webSiteSchema({ locale }) {
  const isAr = locale === "ar";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/${locale}`,
    name: isAr ? SITE_NAME_AR : SITE_NAME_EN,
    inLanguage: isAr ? "ar-SA" : "en-US",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/**
 * LocalBusiness — the single biggest structured-data gap for a business that
 * sells Google Maps optimisation. areaServed is the list of cities served.
 */
export function localBusinessSchema({ locale, settings, city, areaServed }) {
  const isAr = locale === "ar";
  const name = isAr ? SITE_NAME_AR : SITE_NAME_EN;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness${city ? `-${city}` : ""}`,
    name: city ? `${name} — ${city}` : name,
    url: `${SITE_URL}/${locale}`,
    ...(settings?.image_url ? { image: settings.image_url } : {}),
    ...(settings?.phone ? { telephone: settings.phone } : {}),
    ...(settings?.email ? { email: settings.email } : {}),
    address: {
      "@type": "PostalAddress",
      addressCountry: "SA",
      ...(city ? { addressLocality: city } : {}),
    },
    ...(areaServed?.length
      ? { areaServed: areaServed.map((c) => ({ "@type": "City", name: c })) }
      : { areaServed: { "@type": "Country", name: "SA" } }),
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}

/**
 * @param items [{ name, path }] — path WITHOUT locale prefix; last item is the
 *              current page and needs no path.
 */
export function breadcrumbSchema({ locale, items }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      // `item.path` is checked against null/undefined rather than for
      // truthiness: the home crumb is passed as path: "", which is falsy, so
      // the previous check silently dropped its URL. Verified in the rendered
      // JSON-LD on /ar/services — position 1 was emitted with a name and no
      // `item`, which makes the trail unresolvable from the top. The final
      // crumb is the one that legitimately omits `item`, and it does so by
      // being passed no path at all.
      ...(item.path === undefined || item.path === null
        ? {}
        : { item: `${SITE_URL}/${locale}${item.path}` }),
    })),
  };
}

/**
 * @param items [{ question, answer }] — answer is plain text; HTML is stripped
 *              so markup from the CMS never lands inside the JSON-LD.
 */
export function faqSchema({ items }) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: String(answer).replace(/<[^>]*>?/gm, "").trim(),
      },
    })),
  };
}

/** Renders one or more schema objects as a single JSON-LD graph. */
export function jsonLd(...schemas) {
  const list = schemas.flat().filter(Boolean);
  return JSON.stringify(list.length === 1 ? list[0] : list);
}
