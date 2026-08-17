// CMS pages change rarely; re-fetch hourly instead of on every request.
export const revalidate = 3600;

import { getPageContent } from "@/lib/pages";
import { supabase } from "@/lib/supabaseClient";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteSettings } from "@/lib/siteSettings";
import { buildMetadata, breadcrumbSchema, jsonLd } from "@/lib/seo";
import { sanitize } from "@/lib/sanitize";
import PageIntro from "@/components/ui/PageIntro";
import { notFound } from "next/navigation";

async function getPage(slug) {
  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";
  const page = await getPage(slug);

  if (!page) {
    return {
      title: isAr ? "الصفحة غير موجودة" : "Page not found",
      robots: { index: false, follow: true },
    };
  }

  const { title, content } = getPageContent(page, isAr);

  return buildMetadata({
    locale,
    path: `/pages/${slug}`,
    title,
    description: content
      ?.replace(/<[^>]*>?/gm, "")
      ?.trim()
      ?.slice(0, 160),
  });
}

export default async function CmsPage({ params }) {
  const { slug } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";
  const t = await getTranslations("legal");
  const tInfo = await getTranslations("infoSite");
  const settings = await siteSettings();

  // Was hardcoded to .eq("slug", "privacy-policy") and ignored the route param,
  // so /pages/terms-conditions served the privacy policy and the terms page was
  // unreachable.
  const page = await getPage(slug);

  // A real 404 instead of a soft 200 with an error message, so a missing page
  // is never indexed as thin content.
  if (!page) notFound();

  const { title, content } = getPageContent(page, isAr);
  const waNumber = settings?.whatsapp?.replace(/[^\d]/g, "");

  // The design puts privacy and terms on one page with in-page anchors. You
  // chose to keep them as two pages, so the sidebar links across instead.
  const legalPages = [
    { slug: "privacy-policy", label: tInfo("privacy") },
    { slug: "terms-conditions", label: tInfo("terms") },
  ];

  const updatedAt = page.updated_at || page.created_at;
  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema({
              locale,
              items: [
                { name: tInfo("home"), path: "" },
                { name: title },
              ],
            }),
          ),
        }}
      />

      <PageIntro badge={t("badge")} title={title}>
        {formattedDate ? (
          <p className="font-grotesk m-0 text-sm text-subtext">
            {t("last_updated")}: {formattedDate}
          </p>
        ) : null}
      </PageIntro>

      <section className="px-6 pt-10 pb-24">
        <div className="mx-auto grid max-w-[1080px] items-start gap-12 lg:grid-cols-[220px_1fr]">
          <aside className="top-24 hidden flex-col gap-1.5 rounded-2xl border border-surface-tint p-4 lg:sticky lg:flex">
            {legalPages.map((item) => {
              const active = item.slug === slug;
              return (
                <Link
                  key={item.slug}
                  href={`/pages/${item.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-lg px-2.5 py-2 text-sm ${
                    active
                      ? "bg-surface-tint-2 font-extrabold text-primary"
                      : "font-bold text-subtext hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </aside>

          <div>
            <div
              dir={isAr ? "rtl" : "ltr"}
              className="text-base leading-[1.9] text-subtext
                [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-accent
                [&_h2:first-child]:mt-0
                [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-black [&_h3]:text-accent
                [&_p]:mb-4
                [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:ps-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:ps-6
                [&_li]:mb-2
                [&_a]:font-bold [&_a]:text-primary [&_a]:underline
                [&_table]:w-full [&_table]:border-collapse
                [&_td]:border [&_td]:border-border [&_td]:p-2
                [&_th]:border [&_th]:border-border [&_th]:bg-background-2 [&_th]:p-2"
              dangerouslySetInnerHTML={{ __html: sanitize(content) }}
            />

            {/* mobile cross-link, since the sidebar is desktop-only */}
            <nav className="mt-10 flex flex-wrap gap-3 lg:hidden">
              {legalPages
                .filter((item) => item.slug !== slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/pages/${item.slug}`}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-bold text-primary"
                  >
                    {item.label}
                  </Link>
                ))}
            </nav>

            <div className="mt-9 rounded-[18px] bg-linear-160 from-accent to-primary p-7 text-center text-text">
              <div className="mb-1.5 text-lg font-black">{t("cta_title")}</div>
              <p className="m-0 mb-4.5 text-sm text-white/85">
                {t("cta_description")}
              </p>
              <a
                href={waNumber ? `https://wa.me/${waNumber}` : "/contact"}
                className="inline-flex rounded-[10px] bg-brand-orange px-7 py-3.5 text-sm font-black text-ink transition-transform hover:-translate-y-0.5"
              >
                {t("cta_button")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
