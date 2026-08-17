import PageIntro from "@/components/ui/PageIntro";
import { getPageContent } from "@/lib/pages";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getLocale, getTranslations } from "next-intl/server";
import { siteSettings } from "@/lib/siteSettings";
import Image from "next/image";
import {
  alternatesFor,
  breadcrumbSchema,
  jsonLd,
  SITE_URL,
} from "@/lib/seo";
import { sanitize } from "@/lib/sanitize";

export async function generateMetadata() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  const title = isAr
    ? "من نحن | ترافيك بلس - شركة تسويق رقمي في الرياض"
    : "About Us | Traffic Plus - Digital Marketing in Riyadh";

  const description = isAr
    ? "تعرّف على فريق ترافيك بلس: مصممون ومطورون ومسوّقون نساعد الشركات والمتاجر في السعودية على بناء حضور رقمي يحقق نتائج قابلة للقياس."
    : "Meet the Traffic Plus team: designers, developers and marketers helping businesses across Saudi Arabia build a digital presence that delivers measurable results.";

  return {
    title,
    description,
    alternates: alternatesFor(locale, "/about-us"),
    openGraph: {
      title,
      description,
      url: `https://www.trafyekbls.com/${locale}/about-us`,
      siteName: "ترافيك بلس",
      locale: isAr ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const VALUE_ICONS = {
  transparency: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  quality: (
    <polygon points="12 2 15 9 22 9 16.5 13.5 18.5 21 12 16.5 5.5 21 7.5 13.5 2 9 9 9" />
  ),
  growth: <path d="M12 20v-6M12 14l-4-4M12 14l4-4M12 4v4" />,
};

function ValueCard({ icon, title, description }) {
  return (
    <div className="rounded-[20px] bg-card p-8 text-center shadow-[0_25px_50px_-25px_color-mix(in_srgb,var(--accent)_20%,transparent)]">
      <div className="mx-auto mb-4.5 flex size-15 items-center justify-center rounded-2xl bg-background-2">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
          aria-hidden="true"
        >
          {icon}
        </svg>
      </div>
      <h3 className="mb-2.5 text-lg font-black text-accent">{title}</h3>
      <p className="text-sm leading-[1.7] text-subtext">{description}</p>
    </div>
  );
}

export default async function About() {
  const locale = await getLocale();
  const isAr = locale === "ar";
  const t = await getTranslations("about");
  const tInfo = await getTranslations("infoSite");
  const settings = await siteSettings();

  const { data: page } = await supabaseAdmin
    .from("pages")
    .select("*")
    .eq("slug", "about-us")
    .single();

  // The intro, values and CTA are not CMS-driven, so a missing page row should
  // cost the story section only — not replace the whole page with an error.
  const story = page ? getPageContent(page, isAr) : null;

  const waNumber = settings?.whatsapp?.replace(/[^\d]/g, "");

  const values = [
    {
      key: "transparency",
      title: t("values.transparency.title"),
      description: t("values.transparency.description"),
    },
    {
      key: "quality",
      title: t("values.quality.title"),
      description: t("values.quality.description"),
    },
    {
      key: "growth",
      title: t("values.growth.title"),
      description: t("values.growth.description"),
    },
  ];

  return (
    <>
      {/* AboutPage + breadcrumb. This page carried no structured data, so the
          entity behind the brand story was never connected to the Organization
          node the website layout emits. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            {
              "@context": "https://schema.org",
              "@type": "AboutPage",
              name: isAr ? "من نحن | ترافيك بلس" : "About Us | Traffic Plus",
              url: `${SITE_URL}/${locale}/about-us`,
              inLanguage: isAr ? "ar-SA" : "en-US",
              mainEntity: { "@id": `${SITE_URL}/#organization` },
            },
            breadcrumbSchema({
              locale,
              items: [
                { name: tInfo("home"), path: "" },
                { name: tInfo("about") },
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

      {/* story */}
      <section className="px-6 py-24">
        <div className="mx-auto flex max-w-[1280px] flex-wrap-reverse items-center gap-14">
          <div className="relative min-w-[320px] flex-[1_1_420px] pb-8">
            <div className="overflow-hidden rounded-3xl shadow-[-25px_35px_60px_-20px_color-mix(in_srgb,var(--accent)_30%,transparent)] [transform:perspective(1200px)_rotateY(8deg)]">
              <Image
                src="/about-visual.png"
                alt={t("story.image_alt")}
                width={720}
                height={380}
                className="h-95 w-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-2.5 rounded-2xl bg-primary px-6 py-4.5 text-text shadow-[0_20px_40px_-10px_color-mix(in_srgb,var(--primary)_40%,transparent)]">
              <div className="text-[28px] font-black">{t("story.stat")}</div>
              <div className="text-[13px] opacity-90">
                {t("story.stat_label")}
              </div>
            </div>
          </div>

          <div className="flex flex-[1_1_460px] flex-col items-start gap-4.5">
            <span className="rounded-full bg-primary/12 px-4.5 py-1.5 text-[13px] font-extrabold text-brand-orange uppercase">
              {t("story.badge")}
            </span>
            <h2 className="m-0 text-2xl leading-[1.25] font-black text-accent md:text-[32px]">
              {story?.title || t("story.title")}
            </h2>
            {story?.content ? (
              <div
                className="text-base leading-[1.85] text-subtext [&_a]:text-primary [&_h3]:mt-4 [&_h3]:font-bold [&_h3]:text-accent [&_p]:mb-3"
                dangerouslySetInnerHTML={{ __html: sanitize(story.content) }}
              />
            ) : (
              <p className="m-0 text-base leading-[1.85] text-subtext">
                {t("story.description")}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* values */}
      <section className="bg-background-2 px-6 pt-20 pb-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-12 text-center">
            <h2 className="mb-2.5 text-2xl font-black text-accent md:text-[32px]">
              {t("values.title")}
            </h2>
            <p className="m-0 text-base text-subtext">
              {t("values.description")}
            </p>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {values.map((value) => (
              <ValueCard
                key={value.key}
                icon={VALUE_ICONS[value.key]}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-[640px] rounded-3xl bg-card px-8 py-12 shadow-[0_30px_60px_-20px_color-mix(in_srgb,var(--accent)_25%,transparent)]">
          <h2 className="mb-3 text-[26px] font-black text-accent">
            {t("cta.title")}
          </h2>
          <p className="mb-6 text-[15px] text-subtext">{t("cta.description")}</p>
          <a
            href={waNumber ? `https://wa.me/${waNumber}` : "/contact"}
            className="inline-flex rounded-[10px] bg-primary px-9 py-4 text-base font-extrabold text-text transition-colors hover:bg-primary-dark"
          >
            {t("cta.button")}
          </a>
        </div>
      </section>
    </>
  );
}
