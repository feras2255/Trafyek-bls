import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { FiClock } from "react-icons/fi";
import {
  buildMetadata,
  alternatesFor,
  breadcrumbSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/seo";
import { sanitize } from "@/lib/sanitize";
import PageIntro from "@/components/ui/PageIntro";
import Pagination from "@/components/ui/Pagination";
import NewsletterForm from "./_components/NewsletterForm";

const PER_PAGE = 9;

export async function generateMetadata({ searchParams }) {
  const locale = await getLocale();
  const isAr = locale === "ar";
  const params = await searchParams;
  const category = params?.category;

  const meta = buildMetadata({
    locale,
    path: "/blogs",
    title: isAr
      ? "المدونة | مقالات السيو والتسويق الرقمي"
      : "Blog | SEO & Digital Marketing Articles",
    description: isAr
      ? "دلائل عملية في السيو المحلي وخرائط جوجل والإعلانات وتصميم المتاجر، من خبرتنا الميدانية في السوق السعودي."
      : "Practical guides on local SEO, Google Maps, paid ads and e-commerce, drawn from our field work in the Saudi market.",
  });

  // A category-filtered view is a subset of the same articles. Indexing it
  // would compete with /blogs for the same terms, so it stays out of the index
  // while still being crawlable for discovery.
  if (category) {
    return { ...meta, robots: { index: false, follow: true } };
  }

  return meta;
}

function readingMinutes(html) {
  const words = String(html ?? "")
    .replace(/<[^>]*>?/gm, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export default async function Blog({ searchParams }) {
  const locale = await getLocale();
  const isAr = locale === "ar";
  const t = await getTranslations("blog");
  const tInfo = await getTranslations("infoSite");

  const params = await searchParams;
  const page = Math.max(1, Number(params?.page) || 1);
  const activeCategory = params?.category ?? null;
  const from = (page - 1) * PER_PAGE;

  const categoryColumn = isAr ? "category_ar" : "category_en";

  let query = supabase
    .from("blogs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + PER_PAGE - 1);

  if (activeCategory) query = query.eq(categoryColumn, activeCategory);

  const { data: blogs, count, error } = await query;

  // Category pills are derived from the articles themselves. The blogs table
  // stores category as free text today; migration 004 adds a proper
  // category_id relation, and this switches to it once that is applied.
  const { data: allCategories } = await supabase
    .from("blogs")
    .select(categoryColumn);

  const categories = [
    ...new Set((allCategories ?? []).map((r) => r[categoryColumn]).filter(Boolean)),
  ];

  const totalPages = Math.ceil((count || 0) / PER_PAGE);

  const formatDate = (value) =>
    new Date(value).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <>
      {/* Blog + breadcrumb. The index emitted no structured data, so the
          article hub had no declared relationship to the Organization even
          though every individual post carries BlogPosting. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            {
              "@context": "https://schema.org",
              "@type": "Blog",
              "@id": `${SITE_URL}/${locale}/blogs#blog`,
              url: `${SITE_URL}/${locale}/blogs`,
              inLanguage: isAr ? "ar-SA" : "en-US",
              publisher: { "@id": `${SITE_URL}/#organization` },
            },
            breadcrumbSchema({
              locale,
              items: [
                { name: tInfo("home"), path: "" },
                { name: tInfo("blog") },
              ],
            }),
          ),
        }}
      />

      <PageIntro
        badge={t("badge")}
        title={t("hero_title")}
        description={t("hero_description")}
      />

      {/* category filter — real links, so the list works without JS and each
          view is crawlable */}
      {categories.length > 1 ? (
        <section className="px-6 pt-10">
          <nav className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-3">
            <Link
              href="/blogs"
              aria-current={!activeCategory ? "page" : undefined}
              className={`rounded-full border-2 px-5 py-2.5 text-sm font-extrabold transition-colors ${
                !activeCategory
                  ? "border-primary bg-primary text-text"
                  : "border-border bg-card text-maintext hover:border-primary"
              }`}
            >
              {t("all")}
            </Link>
            {categories.map((category) => {
              const active = category === activeCategory;
              return (
                <Link
                  key={category}
                  href={{ pathname: "/blogs", query: { category } }}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full border-2 px-5 py-2.5 text-sm font-extrabold transition-colors ${
                    active
                      ? "border-primary bg-primary text-text"
                      : "border-border bg-card text-maintext hover:border-primary"
                  }`}
                >
                  {category}
                </Link>
              );
            })}
          </nav>
        </section>
      ) : null}

      <section className="px-6 pt-10 pb-20">
        <div className="mx-auto max-w-[1280px]">
          {error ? (
            <p className="py-16 text-center text-subtext italic">
              {t("load_error")}
            </p>
          ) : !blogs?.length ? (
            <p className="py-16 text-center text-subtext">{t("empty")}</p>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
              {blogs.map((post) => {
                const title = isAr ? post.title_ar : post.title_en;
                const excerpt = isAr
                  ? post.description_ar
                  : post.description_en;
                const category = post[categoryColumn];

                return (
                  <Link
                    key={post.id}
                    href={`/blogs/${post.id}`}
                    dir={isAr ? "rtl" : "ltr"}
                    className="group flex flex-col overflow-hidden rounded-[22px] border border-surface-tint bg-card shadow-[0_22px_50px_-28px_color-mix(in_srgb,var(--accent)_20%,transparent)] transition-transform duration-500 hover:-translate-y-2.5"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image
                        src={post.image_url || "/he.png"}
                        alt={title || ""}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {category ? (
                        <span className="absolute top-3.5 right-3.5 rounded-full bg-card px-3 py-1.5 text-xs font-extrabold text-primary">
                          {category}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex flex-1 flex-col gap-2.5 p-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-subtext">
                        {formatDate(post.created_at)}
                        <span aria-hidden="true">·</span>
                        <span className="inline-flex items-center gap-1">
                          <FiClock />
                          {t("read_time", { minutes: readingMinutes(excerpt) })}
                        </span>
                      </div>

                      <h2 className="m-0 text-[19px] leading-[1.4] font-black text-accent">
                        {title}
                      </h2>

                      <div
                        className="m-0 line-clamp-3 text-sm leading-[1.7] text-subtext"
                        dangerouslySetInnerHTML={{ __html: sanitize(excerpt) }}
                      />

                      <span className="mt-auto pt-3.5 text-[13px] font-extrabold text-primary">
                        {t("read_more")} {isAr ? "←" : "→"}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {totalPages > 1 ? (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              locale={locale}
              isAr={isAr}
            />
          ) : null}
        </div>
      </section>

      {/* newsletter — requires migration 002 */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[900px] rounded-3xl bg-background-2 px-10 py-12 text-center shadow-[0_30px_60px_-25px_color-mix(in_srgb,var(--accent)_15%,transparent)]">
          <h2 className="mb-2.5 text-[26px] font-black text-accent">
            {t("newsletter.title")}
          </h2>
          <p className="mb-6 text-[15px] text-subtext">
            {t("newsletter.description")}
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
