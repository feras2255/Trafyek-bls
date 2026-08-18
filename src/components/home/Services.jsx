import { supabase } from "@/lib/supabaseClient";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

// Fallback glyph for a category with no image set in the dashboard. The
// approved design gives every card an icon, so an empty tile would read as a
// loading failure rather than a deliberate blank.
function ServiceGlyph({ className }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="3 17 9 11 13 15 21 6" />
      <polyline points="15 6 21 6 21 12" />
    </svg>
  );
}

export default async function Services({ isHomePage = false }) {
  const locale = await getLocale();
  const t = await getTranslations("services");
  const isRtl = locale === "ar";

  let query = supabase
    .from("categories")
    .select("*")
    .order("order", { ascending: true });

  if (isHomePage) query = query.limit(6);

  const { data: categories, error } = await query;

  if (error) {
    return (
      <p className="py-20 text-center text-subtext italic">{t("load_error")}</p>
    );
  }

  if (!categories?.length) {
    return <p className="py-20 text-center text-subtext">{t("empty")}</p>;
  }

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-[1280px]">
        {isHomePage ? (
          <div className="mb-14 text-center">
            <h2 className="mb-3 text-3xl font-black text-accent md:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto max-w-[640px] text-[17px] leading-[1.8] text-subtext">
              {t("description")}
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-7">
          {categories.map((category) => {
            const title = isRtl ? category.title_ar : category.title_en;
            const description = isRtl
              ? category.description_ar
              : category.description_en;
            const badge = isRtl ? category.badge_ar : category.badge_en;
            const highlighted = Boolean(category.is_highlighted);

            return (
              <article
                key={category.id}
                className={`relative overflow-hidden rounded-3xl border p-9 shadow-[0_25px_55px_-25px_color-mix(in_srgb,var(--accent)_22%,transparent)] transition-transform duration-500 hover:-translate-y-2 ${
                  highlighted
                    ? "border-accent bg-accent"
                    : "border-border bg-card"
                }`}
              >
                {highlighted && badge ? (
                  <span className="absolute top-5 left-5 rounded-full bg-brand-orange px-3 py-1 text-[11px] font-black text-ink">
                    {badge}
                  </span>
                ) : null}

                <div
                  className={`mb-5.5 flex size-15 items-center justify-center overflow-hidden rounded-2xl ${
                    highlighted ? "bg-white/12" : "bg-background-2"
                  }`}
                >
                  {category.image_url ? (
                    <Image
                      src={category.image_url}
                      alt=""
                      width={28}
                      height={28}
                      className="size-7 object-contain"
                    />
                  ) : (
                    <ServiceGlyph
                      className={
                        highlighted ? "text-brand-orange" : "text-primary"
                      }
                    />
                  )}
                </div>

                <h3
                  className={`mb-2.5 text-[21px] font-black ${
                    highlighted ? "text-text" : "text-accent"
                  }`}
                >
                  {title}
                </h3>

                <p
                  className={`mb-4.5 line-clamp-3 text-[15px] leading-[1.75] ${
                    highlighted ? "text-white/75" : "text-subtext"
                  }`}
                >
                  {description}
                </p>

                <Link
                  href={`/services/${category.id}`}
                  className={`text-[13px] font-extrabold ${
                    highlighted ? "text-brand-orange" : "text-primary"
                  }`}
                >
                  {t("details")} {isRtl ? "←" : "→"}
                </Link>
              </article>
            );
          })}
        </div>

        {isHomePage ? (
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex rounded-[10px] bg-linear-135 from-accent to-primary px-9 py-4 text-base font-extrabold text-text transition-transform hover:-translate-y-0.5"
            >
              {t("view_all")}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
