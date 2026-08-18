export const revalidate = 3600;

// No generateStaticParams on purpose. With it present, an unknown or
// unpublished slug produced a 500 instead of a 404 — reproduced against a
// build where city_pages was absent. /pages/[slug] sits in the same route
// group with the same revalidate, calls notFound() the same way, and 404s
// correctly; the only difference was this export. Published cities are few and
// revalidate already caches them, so prerendering bought nothing.

import { supabase } from "@/lib/supabaseClient";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { siteSettings } from "@/lib/siteSettings";
import { sanitize } from "@/lib/sanitize";
import PageIntro from "@/components/ui/PageIntro";
import Services from "@/components/home/Services";
import {
  buildMetadata,
  breadcrumbSchema,
  faqSchema,
  jsonLd,
  localBusinessSchema,
} from "@/lib/seo";

/**
 * City landing page.
 *
 * Only PUBLISHED rows render. Migration 008 refuses to set is_published unless
 * the city-specific fields are genuinely filled in, so an unwritten city 404s
 * instead of shipping a template with a name swapped into it — which is the
 * doorway-page pattern, and a scaled-content-abuse risk.
 *
 * That means: adding a city to lib/cities.js does NOT create a page. Someone
 * has to write it.
 */
async function getCity(slug) {
  // Defensive on purpose: before migration 008 runs, city_pages does not exist
  // and the query rejects. A missing table, a dropped connection or an RLS
  // denial must all degrade to "no such city" -> 404, never a 500. Verified by
  // hitting this route with the table absent.
  try {
    const { data, error } = await supabase
      .from("city_pages")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { city: slug } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";
  const city = await getCity(slug);

  if (!city) {
    return { robots: { index: false, follow: true } };
  }

  const name = isAr ? city.name_ar : city.name_en;

  return buildMetadata({
    locale,
    path: `/cities/${slug}`,
    title:
      (isAr ? city.meta_title_ar : city.meta_title_en) ||
      (isAr
        ? `التسويق الرقمي والسيو في ${name} | ترافيك بلس`
        : `Digital Marketing & SEO in ${name} | Traffic Plus`),
    description:
      (isAr ? city.meta_description_ar : city.meta_description_en) ||
      (isAr ? city.intro_ar : city.intro_en)
        ?.replace(/<[^>]*>?/gm, "")
        ?.trim()
        ?.slice(0, 160),
  });
}

export default async function CityPage({ params }) {
  const { city: slug } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";
  const t = await getTranslations("city");
  const tInfo = await getTranslations("infoSite");

  const city = await getCity(slug);
  // Unpublished or unknown -> a real 404, never a thin page.
  if (!city) notFound();

  const settings = await siteSettings();
  const name = isAr ? city.name_ar : city.name_en;
  const intro = isAr ? city.intro_ar : city.intro_en;
  const localContext = isAr ? city.local_context_ar : city.local_context_en;
  const waNumber = settings?.whatsapp?.replace(/[^\d]/g, "");

  const faqItems = Array.isArray(city.faq)
    ? city.faq
        .map((item) => ({
          question: isAr ? item.q_ar : item.q_en,
          answer: isAr ? item.a_ar : item.a_en,
        }))
        .filter((item) => item.question && item.answer)
    : [];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            // Scoped to this city, so the schema describes the page rather than
            // repeating the site-wide business entity.
            localBusinessSchema({
              locale,
              settings,
              city: name,
              areaServed: [name],
            }),
            breadcrumbSchema({
              locale,
              items: [{ name: tInfo("home"), path: "" }, { name }],
            }),
            faqItems.length ? faqSchema({ items: faqItems }) : null,
          ),
        }}
      />

      <PageIntro
        badge={t("badge")}
        title={t("hero_title", { city: name })}
        description={t("hero_description", { city: name })}
      />

      <section className="px-6 py-16">
        <div
          dir={isAr ? "rtl" : "ltr"}
          className="mx-auto max-w-[820px] text-base leading-[1.9] text-subtext
            [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-accent
            [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-black [&_h3]:text-accent
            [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:ps-6 [&_li]:mb-2
            [&_a]:font-bold [&_a]:text-primary [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: sanitize(intro) }}
        />
      </section>

      {localContext ? (
        <section className="bg-background-2 px-6 py-16">
          <div className="mx-auto max-w-[820px]">
            <h2 className="mb-4 text-2xl font-black text-accent">
              {t("local_title", { city: name })}
            </h2>
            <div
              dir={isAr ? "rtl" : "ltr"}
              className="text-base leading-[1.9] text-subtext [&_li]:mb-2 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:ps-6"
              dangerouslySetInnerHTML={{ __html: sanitize(localContext) }}
            />
          </div>
        </section>
      ) : null}

      <Services isHomePage />

      {faqItems.length ? (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-[820px]">
            <h2 className="mb-8 text-center text-2xl font-black text-accent">
              {t("faq_title", { city: name })}
            </h2>
            <div className="flex flex-col gap-3">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-surface-tint bg-card px-5 py-4"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-extrabold text-accent [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <span
                      aria-hidden="true"
                      className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background-2 text-primary transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 mb-0 text-[15px] leading-[1.8] text-subtext">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 pb-24 text-center">
        <div className="mx-auto max-w-[640px] rounded-3xl bg-linear-160 from-accent to-primary px-8 py-12 text-text">
          <h2 className="mb-3 text-[26px] font-black">
            {t("cta_title", { city: name })}
          </h2>
          <p className="mb-6 text-[15px] text-white/80">{t("cta_description")}</p>
          <a
            href={waNumber ? `https://wa.me/${waNumber}` : "/contact"}
            className="inline-flex rounded-[10px] bg-brand-orange px-9 py-4 text-base font-black text-ink"
          >
            {t("cta_button")}
          </a>
        </div>
      </section>
    </main>
  );
}
