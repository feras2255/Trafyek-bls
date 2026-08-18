import { siteSettings } from "@/lib/siteSettings";
import ContactForm from "./_Component/ContactForm";
import PageIntro from "@/components/ui/PageIntro";
import { getLocale, getTranslations } from "next-intl/server";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  const title = isAr
    ? "اتصل بنا | ترافيك بلس - حلول تقنية متكاملة"
    : "Contact Us | Traffic Plus - Integrated Tech Solutions";

  const description = isAr
    ? "تواصل مع فريق ترافيك بلس في السعودية للبدء في مشروعك الرقمي القادم. نحن هنا للإجابة على استفساراتك حول البرمجة والتسويق الرقمي."
    : "Contact Traffic Plus team in Saudi Arabia to start your next digital project. We are here to answer your questions about programming and digital marketing.";

  return {
    title,
    description,
    alternates: alternatesFor(locale, "/contact"),
    openGraph: {
      title,
      description,
      url: `https://www.trafyekbls.com/${locale}/contact`,
      siteName: "ترافيك بلس",
      images: [{ url: "/favicon.png", width: 800, height: 600 }],
      locale: isAr ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

const PhoneIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 5a2 2 0 0 1 2-2h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 12l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 5z" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const PinIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

function InfoCard({ tone, icon, label, value, href }) {
  const body = (
    <>
      <span
        className={`flex size-[50px] shrink-0 items-center justify-center rounded-[14px] text-text ${tone}`}
      >
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-[13px] text-subtext">{label}</span>
        <span className="text-base font-extrabold text-accent">{value}</span>
      </span>
    </>
  );

  const shell =
    "flex items-center gap-4 rounded-[20px] bg-background-2 p-7 shadow-[0_20px_40px_-20px_color-mix(in_srgb,var(--accent)_15%,transparent)]";

  return href ? (
    <a
      href={href}
      className={`${shell} transition-transform hover:-translate-y-1`}
    >
      {body}
    </a>
  ) : (
    <div className={shell}>{body}</div>
  );
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const locale = await getLocale();
  const isAr = locale === "ar";
  const settings = await siteSettings();

  // Digits only — a number stored as "+966 53 044 6151" breaks a wa.me link.
  const waNumber = settings?.whatsapp?.replace(/[^\d]/g, "");
  const mapQuery = encodeURIComponent(t("info.map_query"));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: isAr ? "اتصل بنا - ترافيك بلس" : "Contact Us - Traffic Plus",
            description: isAr
              ? "اتصل بنا | ترافيك بلس - حلول تقنية متكاملة"
              : "Contact Us | Traffic Plus - Integrated Tech Solutions",
            mainEntity: {
              "@type": "Organization",
              name: "ترافيك بلس",
              telephone: settings?.phone,
              email: settings?.email,
              areaServed: "SA",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: settings?.phone,
                contactType: "customer service",
                availableLanguage: ["Arabic", "English"],
              },
            },
          }),
        }}
      />

      <PageIntro
        badge={t("form.badge")}
        title={t("hero.title")}
        description={t("hero.description")}
      />

      {/* form + channels */}
      <section className="px-6 py-20">
        <div className="mx-auto flex max-w-[1100px] flex-wrap gap-10">
          <div className="flex-[1_1_380px] rounded-3xl border border-border bg-card p-6 shadow-[0_30px_60px_-25px_color-mix(in_srgb,var(--accent)_22%,transparent)] md:p-10">
            <h2 className="mb-5.5 text-[22px] font-black text-accent">
              {t("form.title")}
            </h2>
            <ContactForm />
          </div>

          <div className="flex flex-[1_1_300px] flex-col gap-5">
            {settings?.whatsapp ? (
              <InfoCard
                tone="bg-primary"
                icon={<PhoneIcon />}
                label={t("info.whatsapp")}
                value={settings.whatsapp}
                href={waNumber ? `https://wa.me/${waNumber}` : undefined}
              />
            ) : null}

            {settings?.email ? (
              <InfoCard
                tone="bg-accent"
                icon={<MailIcon />}
                label={t("info.email")}
                value={settings.email}
                href={`mailto:${settings.email}`}
              />
            ) : null}

            <InfoCard
              tone="bg-brand-orange"
              icon={<PinIcon />}
              label={t("info.location")}
              value={t("info.address")}
            />

            {/* Kept from the previous page — the design dropped it, but the
                hours are real information a visitor acts on. */}
            <InfoCard
              tone="bg-sucsses"
              icon={<ClockIcon />}
              label={t("working_hours.title")}
              value={`${t("working_hours.days")}${t("working_hours.time")}`}
            />
          </div>
        </div>
      </section>

      {/* map */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1100px] overflow-hidden rounded-3xl border border-border shadow-[0_30px_60px_-25px_color-mix(in_srgb,var(--accent)_22%,transparent)]">
          <iframe
            title={t("info.map_title")}
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            className="block h-90 w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
