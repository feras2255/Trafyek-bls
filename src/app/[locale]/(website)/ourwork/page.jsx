export const revalidate = 3600;

import { supabase } from "@/lib/supabaseClient";
import Showcase from "@/components/showcase/Showcase";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import PageIntro from "@/components/ui/PageIntro";
import { siteSettings } from "@/lib/siteSettings";
import { sanitize } from "@/lib/sanitize";
import { buildMetadata, breadcrumbSchema, faqSchema, jsonLd } from "@/lib/seo";

const FAQ_KEYS = ["duration", "cost", "tech", "support", "ownership", "start"];

export async function generateMetadata() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return buildMetadata({
    locale,
    path: "/ourwork",
    title: isAr
      ? "أعمالنا | مشاريع ومتاجر ومواقع نفّذناها"
      : "Our Work | Projects, Stores and Websites We Built",
    description: isAr
      ? "نماذج من مشاريع ترافيك بلس: مواقع ومتاجر إلكترونية وحملات سيو وإعلانات لعملاء في السعودية، بنتائج قابلة للقياس."
      : "A selection of Traffic Plus projects: websites, online stores, SEO and ad campaigns for clients across Saudi Arabia, with measurable results.",
  });
}

function StatCell({ value, suffix, label }) {
  return (
    <div className="text-center">
      <div className="font-mono-display text-4xl leading-none font-bold text-text md:text-[46px]">
        {value}
        {suffix ? <span className="text-brand-orange">{suffix}</span> : null}
      </div>
      <div className="mt-2 text-[13px] text-white/70">{label}</div>
    </div>
  );
}

export default async function OurWork() {
  const t = await getTranslations("ourwork");
  const tInfo = await getTranslations("infoSite");
  const locale = await getLocale();
  const isAr = locale === "ar";
  const settings = await siteSettings();

  const [{ data: categories }, { data: projects, count }] = await Promise.all([
    supabase.from("categories").select("*").order("order", { ascending: true }),
    supabase
      .from("projects")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false }),
  ]);

  const localizedCategories = (categories ?? []).map((cat) => ({
    ...cat,
    title: isAr ? cat.title_ar : cat.title_en,
  }));

  const localizedProjects = (projects ?? []).map((proj) => ({
    ...proj,
    title: isAr ? proj.title_ar : proj.title_en,
    description: isAr ? proj.description_ar : proj.description_en,
  }));

  // Featured case study — needs migration 003. Until a project is flagged the
  // section simply does not render, so the page is correct either way.
  const caseStudy = (projects ?? []).find((p) => p.is_case_study);

  const waNumber = settings?.whatsapp?.replace(/[^\d]/g, "");

  const faqItems = FAQ_KEYS.map((key) => ({
    question: t(`faq.${key}.q`),
    answer: t(`faq.${key}.a`),
  }));

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            breadcrumbSchema({
              locale,
              items: [
                { name: tInfo("home"), path: "" },
                { name: tInfo("ourwork") },
              ],
            }),
            faqSchema({ items: faqItems }),
          ),
        }}
      />

      <PageIntro
        badge={t("badge")}
        title={t("hero_title")}
        description={t("hero_description")}
      />

      {/* featured case study — requires migration 003 */}
      {caseStudy ? (
        <section className="px-6 py-16">
          <div className="mx-auto grid max-w-[1280px] items-center gap-12 lg:grid-cols-2">
            <div className="overflow-hidden rounded-3xl shadow-[0_30px_60px_-25px_color-mix(in_srgb,var(--accent)_30%,transparent)]">
              <Image
                src={caseStudy.image_url || "/he.png"}
                alt={(isAr ? caseStudy.title_ar : caseStudy.title_en) || ""}
                width={720}
                height={460}
                className="h-auto w-full object-cover"
              />
            </div>

            <div className="flex flex-col items-start gap-4">
              <span className="rounded-full bg-primary/12 px-4.5 py-1.5 text-[13px] font-extrabold text-brand-orange uppercase">
                {t("case_study")}
              </span>
              <h2 className="m-0 text-2xl leading-[1.3] font-black text-accent md:text-3xl">
                {isAr ? caseStudy.title_ar : caseStudy.title_en}
              </h2>

              {caseStudy.result_value ? (
                <div className="flex items-baseline gap-3 rounded-2xl bg-background-2 px-5 py-4">
                  <span className="font-mono-display text-3xl font-bold text-primary">
                    {caseStudy.result_value}
                  </span>
                  <span className="text-sm font-bold text-subtext">
                    {isAr
                      ? caseStudy.result_label_ar
                      : caseStudy.result_label_en}
                  </span>
                </div>
              ) : null}

              <div
                className="text-base leading-[1.85] text-subtext [&_p]:mb-3"
                dangerouslySetInnerHTML={{
                  __html: sanitize(
                    isAr ? caseStudy.description_ar : caseStudy.description_en,
                  ),
                }}
              />

              <Link
                href={`/ourwork/${caseStudy.id}`}
                className="rounded-[10px] bg-primary px-7 py-3.5 text-sm font-extrabold text-text transition-colors hover:bg-primary-dark"
              >
                {t("read_case_study")}
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* impact in numbers */}
      <section className="px-6 py-10">
        <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-3xl bg-linear-160 from-accent to-primary px-6 py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 right-[10%] size-80 rounded-full bg-white/10 blur-[80px]"
          />
          <div className="relative mb-10 text-center">
            <span className="font-mono-display text-xs font-bold tracking-[0.12em] text-brand-orange">
              IMPACT IN NUMBERS
            </span>
            <h2 className="mt-2.5 mb-0 text-2xl font-black text-text md:text-3xl">
              {t("impact_title")}
            </h2>
          </div>

          <div className="relative grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-8">
            {/* Real, counted from the projects table rather than asserted. */}
            <StatCell
              value={count ?? localizedProjects.length}
              suffix="+"
              label={t("impact.projects")}
            />
            <StatCell
              value={t("impact.satisfaction_value")}
              suffix="%"
              label={t("impact.satisfaction")}
            />
            <StatCell
              value={t("impact.growth_value")}
              suffix="%"
              label={t("impact.growth")}
            />
            <StatCell
              value={t("impact.years_value")}
              suffix="+"
              label={t("impact.years")}
            />
          </div>
        </div>
      </section>

      {/* all projects — keeps the existing category filter */}
      <section className="px-6 pt-14 pb-6">
        <div className="mx-auto max-w-[1280px] text-center">
          <h2 className="mb-2.5 text-2xl font-black text-accent md:text-[32px]">
            {t("all_projects")}
          </h2>
        </div>
      </section>

      {localizedProjects.length ? (
        <Showcase
          categories={localizedCategories}
          items={localizedProjects}
          type="ourwork"
          isAr={isAr}
        />
      ) : (
        <p className="py-10 text-center text-subtext">{t("empty")}</p>
      )}

      {/* FAQ */}
      <section className="bg-background-2 px-6 py-20">
        <div className="mx-auto max-w-[820px]">
          <h2 className="mb-8 text-center text-2xl font-black text-accent md:text-[30px]">
            {t("faq_title")}
          </h2>
          <div className="flex flex-col gap-3">
            {FAQ_KEYS.map((key) => (
              <details
                key={key}
                className="group rounded-2xl border border-surface-tint bg-card px-5 py-4"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-extrabold text-accent [&::-webkit-details-marker]:hidden">
                  {t(`faq.${key}.q`)}
                  <span
                    aria-hidden="true"
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-background-2 text-primary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 mb-0 text-[15px] leading-[1.8] text-subtext">
                  {t(`faq.${key}.a`)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-[640px] rounded-3xl bg-card px-8 py-12 shadow-[0_30px_60px_-20px_color-mix(in_srgb,var(--accent)_25%,transparent)]">
          <h2 className="mb-3 text-[26px] font-black text-accent">
            {t("cta_title")}
          </h2>
          <p className="mb-6 text-[15px] text-subtext">{t("cta_description")}</p>
          <a
            href={waNumber ? `https://wa.me/${waNumber}` : "/contact"}
            className="inline-flex rounded-[10px] bg-primary px-9 py-4 text-base font-extrabold text-text transition-colors hover:bg-primary-dark"
          >
            {t("cta_button")}
          </a>
        </div>
      </section>
    </main>
  );
}
