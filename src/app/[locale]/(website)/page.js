export const revalidate = 3600;

import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { siteSettings } from "@/lib/siteSettings";
// areaServed is a factual claim about where the business operates, so it lives
// in one reviewable place with verified city spellings. See lib/regions.js.
import { AREA_SERVED, AREA_SERVED_EN } from "@/lib/regions";
import {
  alternatesFor,
  faqSchema,
  jsonLd,
  localBusinessSchema,
} from "@/lib/seo";

import Partners from "@/components/home/Partners";
import FAQ from "@/components/home/FAQ";
import MarqueeSlider from "@/components/home/MarqueeSlider";
import Services from "@/components/home/Services";
import FeaturedProjects from "@/components/home/FeaturedProjects";

const WHY_KEYS = [
  "experience",
  "results",
  "ai",
  "google",
  "projects",
  "support",
];

const PILLAR_KEYS = ["automate", "attract", "decide"];

export async function generateMetadata() {
  const locale = await getLocale();
  // Title, description and keywords come from the root layout, which already
  // describes the home page. Only canonical and hreflang are per-locale.
  return { alternates: alternatesFor(locale, "") };
}

/** Illustrative product panel from the design. Decorative — the figures are a
 *  UI mockup of an analytics dashboard, not claims about this business, so it
 *  is hidden from assistive tech and carries no schema. */
function DashboardMock({ labels }) {
  return (
    <div
      aria-hidden="true"
      className="rounded-3xl border border-surface-tint bg-card p-5 shadow-[0_40px_80px_-30px_color-mix(in_srgb,var(--accent)_35%,transparent)]"
    >
      <div className="mb-3.5 flex items-center justify-between">
        <span className="flex items-center gap-2">
          <span className="size-2.5 animate-pulse rounded-full bg-sucsses" />
          <span className="font-grotesk text-xs tracking-[0.05em] text-subtext">
            LIVE ANALYTICS
          </span>
        </span>
        <span className="font-grotesk text-[11px] text-muted">AI Dashboard</span>
      </div>

      <div className="mb-3.5 grid grid-cols-2 gap-3">
        {[
          { label: labels.leads, value: "1,284", delta: "▲ 34%" },
          { label: labels.conversion, value: "6.8%", delta: "▲ 12%" },
        ].map((cell) => (
          <div
            key={cell.label}
            className="rounded-2xl border border-primary/15 bg-primary/8 p-4"
          >
            <div className="text-xs text-subtext">{cell.label}</div>
            <div className="font-grotesk text-2xl font-bold text-accent">
              {cell.value}
            </div>
            <div className="text-[11px] font-bold text-sucsses">
              {cell.delta}
            </div>
          </div>
        ))}
      </div>

      {/* bar chart illustration */}
      <div className="flex h-28 items-end gap-2 rounded-2xl bg-background-2 p-4">
        {[38, 52, 44, 66, 58, 80, 72].map((h, i) => (
          <span
            key={i}
            style={{ height: `${h}%` }}
            className="flex-1 rounded-t-md bg-linear-to-t from-primary/40 to-primary"
          />
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  const locale = await getLocale();
  const isAr = locale === "ar";
  const t = await getTranslations("home");
  const settings = await siteSettings();

  const [{ data: projects }, { count: projectCount }] = await Promise.all([
    supabaseAdmin
      .from("projects")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(6),
    supabaseAdmin.from("projects").select("id", { count: "exact", head: true }),
  ]);

  const localizedProjects = (projects || []).map((proj) => ({
    ...proj,
    title: isAr ? proj.title_ar : proj.title_en,
    description: isAr ? proj.description_ar : proj.description_en,
  }));

  const waNumber = settings?.whatsapp?.replace(/[^\d]/g, "");
  const consultHref = waNumber ? `https://wa.me/${waNumber}` : "/contact";

  const tFaq = await getTranslations("faq");
  const faqItems = ["1", "2", "3", "4", "5"].map((n) => ({
    question: tFaq(`q${n}`),
    answer: tFaq(`a${n}`),
  }));

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            localBusinessSchema({
              locale,
              settings,
              areaServed: isAr ? AREA_SERVED : AREA_SERVED_EN,
            }),
            faqSchema({ items: faqItems }),
          ),
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden bg-linear-to-b from-[#faf7ff] to-background px-7 pt-20 pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-30 -right-20 size-130 rounded-full bg-primary/15 blur-[100px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-25 size-140 rounded-full bg-accent/10 blur-[100px]"
        />

        <div className="relative mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div className="flex flex-col items-start gap-6">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-[13px] font-extrabold text-primary">
              <span className="size-2 animate-pulse rounded-full bg-brand-orange" />
              {t("hero.badge")}
            </span>

            <h1 className="m-0 text-4xl leading-[1.1] font-black text-accent md:text-5xl lg:text-6xl">
              {t("hero.title_lead")}{" "}
              <span className="bg-linear-120 from-primary to-accent bg-clip-text text-transparent">
                {t("hero.title_highlight")}
              </span>
            </h1>

            <p className="m-0 max-w-[520px] text-[17px] leading-[1.75] text-subtext md:text-[19px]">
              {t("hero.description")}
            </p>

            <div className="mt-1 flex flex-wrap gap-3.5">
              <a
                href={consultHref}
                className="rounded-xl bg-linear-135 from-accent to-primary px-8 py-4 text-base font-extrabold text-text shadow-[0_14px_30px_-10px_color-mix(in_srgb,var(--primary)_60%,transparent)] transition-transform hover:-translate-y-0.5"
              >
                {t("hero.cta_primary")}
              </a>
              <Link
                href="/ourwork"
                className="rounded-xl border-2 border-primary/25 bg-card px-8 py-4 text-base font-extrabold text-primary transition-colors hover:border-primary"
              >
                {t("hero.cta_secondary")}
              </Link>
            </div>

            {/* Only figures with something real behind them. The project count
                is COUNTed from the projects table. */}
            <div className="font-grotesk mt-3.5 flex flex-wrap gap-9 border-t border-border pt-6">
              <div>
                <div className="text-[28px] font-bold text-accent">
                  {t("hero.years_value")}
                </div>
                <div className="text-xs text-subtext">{t("hero.years")}</div>
              </div>
              <div>
                <div className="text-[28px] font-bold text-accent">
                  {projectCount ? `+${projectCount}` : "—"}
                </div>
                <div className="text-xs text-subtext">{t("hero.projects")}</div>
              </div>
            </div>
          </div>

          <DashboardMock
            labels={{
              leads: t("hero.mock_leads"),
              conversion: t("hero.mock_conversion"),
            }}
          />
        </div>
      </section>

      <MarqueeSlider />

      {/* WHY US */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="mb-12 text-center text-2xl font-black text-accent md:text-[32px]">
            {t("why.title")}
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
            {WHY_KEYS.map((key) => (
              <div
                key={key}
                className="rounded-[20px] border border-surface-tint bg-card p-7 shadow-card-lift-sm transition-transform duration-500 hover:-translate-y-2"
              >
                <h3 className="mb-2.5 text-lg font-black text-accent">
                  {t(`why.${key}.title`)}
                </h3>
                <p className="m-0 text-sm leading-[1.75] text-subtext">
                  {t(`why.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI TRANSFORMATION */}
      <section className="bg-linear-160 from-accent to-primary px-6 py-20">
        <div className="mx-auto max-w-[1080px] text-center">
          <span className="font-mono-display text-xs font-bold tracking-[0.12em] text-brand-orange">
            AI TRANSFORMATION
          </span>
          <h2 className="mx-auto mt-3 mb-4 max-w-[760px] text-2xl leading-[1.3] font-black text-text md:text-[32px]">
            {t("ai.title")}
          </h2>
          <p className="mx-auto mb-12 max-w-[620px] text-base leading-[1.8] text-white/75">
            {t("ai.description")}
          </p>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6 text-start">
            {PILLAR_KEYS.map((key) => (
              <div
                key={key}
                className="rounded-[20px] border border-white/15 bg-white/10 p-6"
              >
                <h3 className="mb-2 text-base font-black text-text">
                  {t(`ai.${key}.title`)}
                </h3>
                <p className="m-0 text-sm leading-[1.75] text-white/75">
                  {t(`ai.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Services isHomePage />

      {/* real proof: actual projects, not invented testimonials */}
      {localizedProjects.length ? (
        <FeaturedProjects
          items={localizedProjects}
          type="ourwork"
          isAr={isAr}
        />
      ) : null}

      <Partners />

      <FAQ whatsapp={waNumber} />

      {/* BIG CTA */}
      <section className="px-6 pt-4 pb-24">
        <div className="relative mx-auto max-w-[1080px] overflow-hidden rounded-3xl bg-linear-135 from-accent to-primary px-8 py-16 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-25 left-[15%] size-80 rounded-full bg-white/10 blur-[80px]"
          />
          <div className="relative">
            <h2 className="mx-auto mb-3 max-w-[620px] text-2xl font-black text-text md:text-[34px]">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mb-8 max-w-[520px] text-base text-white/80">
              {t("cta.description")}
            </p>
            <a
              href={consultHref}
              className="inline-flex rounded-xl bg-brand-orange px-9 py-4 text-base font-black text-ink transition-transform hover:-translate-y-0.5"
            >
              {t("cta.button")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
