export const revalidate = 3600;

import { supabase } from "@/lib/supabaseClient";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { siteSettings } from "@/lib/siteSettings";
import ArticleShare from "@/components/ui/ArticleShare";
import { sanitize } from "@/lib/sanitize";
import { buildMetadata, breadcrumbSchema, jsonLd, SITE_URL } from "@/lib/seo";
import { notFound } from "next/navigation";

async function getPost(id) {
  const { data } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();
  return data;
}

function readingMinutes(html) {
  const words = String(html ?? "")
    .replace(/<[^>]*>?/gm, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";
  const post = await getPost(id);

  if (!post) {
    return {
      title: isAr ? "المقال غير موجود" : "Post not found",
      robots: { index: false, follow: true },
    };
  }

  const title = isAr ? post.title_ar : post.title_en;
  const body = isAr ? post.description_ar : post.description_en;

  return buildMetadata({
    locale,
    path: `/blogs/${id}`,
    title,
    description: body
      ?.replace(/<[^>]*>?/gm, "")
      ?.trim()
      ?.slice(0, 160),
    type: "article",
    images: post.image_url
      ? [{ url: post.image_url, width: 1200, height: 630, alt: title }]
      : undefined,
  });
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";
  const t = await getTranslations("article");
  const tInfo = await getTranslations("infoSite");
  const settings = await siteSettings();

  const post = await getPost(id);
  // A real 404 instead of a soft 200 carrying an error message, which would be
  // indexable thin content.
  if (!post) notFound();

  const title = isAr ? post.title_ar : post.title_en;
  const body = isAr ? post.description_ar : post.description_en;
  const categoryColumn = isAr ? "category_ar" : "category_en";
  const category = post[categoryColumn];
  // Was hardcoded as "قراءة ٥ دقائق" on every article regardless of length.
  const minutes = readingMinutes(body);
  const waNumber = settings?.whatsapp?.replace(/[^\d]/g, "");

  const date = new Date(post.created_at).toLocaleDateString(
    isAr ? "ar-EG" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  // Related articles: same category, newest first, excluding this one. Uses the
  // existing free-text category column so it works before migration 004 adds
  // the proper relation.
  let relatedQuery = supabase
    .from("blogs")
    .select("id, title_ar, title_en, image_url")
    .neq("id", id)
    .order("created_at", { ascending: false })
    .limit(3);
  if (category) relatedQuery = relatedQuery.eq(categoryColumn, category);
  let { data: related } = await relatedQuery;

  // Fall back to the most recent overall so the strip is never empty when a
  // category holds a single article.
  if (!related?.length) {
    const { data: recent } = await supabase
      .from("blogs")
      .select("id, title_ar, title_en, image_url")
      .neq("id", id)
      .order("created_at", { ascending: false })
      .limit(3);
    related = recent ?? [];
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            {
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: title,
              ...(post.image_url ? { image: post.image_url } : {}),
              datePublished: post.created_at,
              dateModified: post.updated_at || post.created_at,
              // Points at the Organization node the website layout emits
              // rather than repeating a partial copy of it.
              author: { "@id": `${SITE_URL}/#organization` },
              publisher: { "@id": `${SITE_URL}/#organization` },
              description: body?.replace(/<[^>]*>?/gm, "")?.slice(0, 160),
              inLanguage: isAr ? "ar-SA" : "en-US",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${SITE_URL}/${locale}/blogs/${id}`,
              },
            },
            breadcrumbSchema({
              locale,
              items: [
                { name: tInfo("home"), path: "" },
                { name: tInfo("blog"), path: "/blogs" },
                { name: title },
              ],
            }),
          ),
        }}
      />

      {/* header */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#faf7ff] to-background px-6 pt-11 pb-5">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-30 -left-15 size-100 rounded-full bg-primary/15 blur-[80px]"
        />
        <div className="relative mx-auto max-w-[820px]">
          <nav
            aria-label={t("breadcrumb")}
            className="font-grotesk mb-4 flex flex-wrap items-center gap-2 text-[13px] text-subtext"
          >
            <Link href="/" className="hover:text-primary">
              {tInfo("home")}
            </Link>
            <span aria-hidden="true">›</span>
            <Link href="/blogs" className="hover:text-primary">
              {tInfo("blog")}
            </Link>
            {category ? (
              <>
                <span aria-hidden="true">›</span>
                <span className="text-primary">{category}</span>
              </>
            ) : null}
          </nav>

          {category ? (
            <span className="inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[13px] font-extrabold text-primary">
              {category}
            </span>
          ) : null}

          <h1 className="mt-4 mb-4.5 text-3xl leading-[1.25] font-black text-accent md:text-[40px]">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-3.5 border-b border-border pb-6">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-linear-135 from-accent to-primary text-sm font-black text-text">
              {isAr ? "ت.ب" : "TP"}
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-extrabold text-accent">
                {t("author")}
              </span>
              <span className="font-grotesk text-xs text-subtext">
                {date} · {t("read_time", { minutes })}
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* cover */}
      {post.image_url ? (
        <section className="px-6 py-6">
          <div className="mx-auto max-w-[900px] overflow-hidden rounded-3xl shadow-[0_34px_70px_-30px_color-mix(in_srgb,var(--accent)_35%,transparent)]">
            <Image
              src={post.image_url}
              alt={title || ""}
              width={900}
              height={400}
              priority
              className="h-auto w-full object-cover"
            />
          </div>
        </section>
      ) : null}

      {/* body + sticky CTA */}
      <section className="px-6 pt-10 pb-16">
        <div className="mx-auto grid max-w-[1100px] items-start gap-10 lg:grid-cols-[1fr_240px]">
          <div
            dir={isAr ? "rtl" : "ltr"}
            className="text-base leading-[1.9] text-subtext
              [&>p:first-child]:text-[19px] [&>p:first-child]:font-semibold
              [&_h2]:mt-9 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-black [&_h2]:text-accent
              [&_h3]:mt-7 [&_h3]:mb-2 [&_h3]:text-lg [&_h3]:font-black [&_h3]:text-accent
              [&_p]:mb-4
              [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:ps-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:ps-6
              [&_li]:mb-2
              [&_a]:font-bold [&_a]:text-primary [&_a]:underline
              [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-2xl
              [&_blockquote]:my-6 [&_blockquote]:rounded-e-xl [&_blockquote]:border-s-4 [&_blockquote]:border-primary [&_blockquote]:bg-surface-tint-2 [&_blockquote]:p-5 [&_blockquote]:text-[17px] [&_blockquote]:font-bold [&_blockquote]:text-accent
              [&_table]:mb-4 [&_table]:w-full [&_table]:border-collapse
              [&_td]:border [&_td]:border-border [&_td]:p-2
              [&_th]:border [&_th]:border-border [&_th]:bg-background-2 [&_th]:p-2"
            dangerouslySetInnerHTML={{ __html: sanitize(body) }}
          />

          <aside className="top-24 flex flex-col gap-5 lg:sticky">
            <div className="rounded-[20px] bg-linear-160 from-accent to-primary p-6 text-text">
              <div className="mb-1.5 text-base font-black">
                {t("cta_title")}
              </div>
              <p className="m-0 mb-4 text-[13px] text-white/85">
                {t("cta_description")}
              </p>
              <a
                href={waNumber ? `https://wa.me/${waNumber}` : "/contact"}
                className="inline-flex rounded-[10px] bg-brand-orange px-5 py-3 text-[13px] font-black text-ink"
              >
                {t("cta_button")}
              </a>
            </div>
          </aside>
        </div>
      </section>

      <div className="px-6">
        <div className="mx-auto max-w-[1100px]">
          <ArticleShare title={title} slug={id} locale={locale} />
        </div>
      </div>

      {/* related */}
      {related?.length ? (
        <section className="bg-background-2 px-6 py-20">
          <div className="mx-auto max-w-[1100px]">
            <h2 className="mb-8 text-2xl font-black text-accent">
              {t("related")}
            </h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/blogs/${item.id}`}
                  className="group flex flex-col overflow-hidden rounded-[18px] border border-surface-tint bg-card transition-transform hover:-translate-y-1.5"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={item.image_url || "/he.png"}
                      alt={(isAr ? item.title_ar : item.title_en) || ""}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="m-0 text-base leading-[1.5] font-black text-accent">
                      {isAr ? item.title_ar : item.title_en}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}
