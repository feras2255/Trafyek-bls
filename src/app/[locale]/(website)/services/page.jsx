import PageIntro from "@/components/ui/PageIntro";
import { getLocale, getTranslations } from "next-intl/server";
import { siteSettings } from "@/lib/siteSettings";
import Services from "@/components/home/Services";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return {
    title: isAr
      ? "خدماتنا | حلول البرمجة والتسويق الرقمي"
      : "Our Services | Software & Digital Marketing Solutions",
    description: isAr
      ? "اكتشف خدمات ترافيك بلس: إنشاء متاجر سلة وزد، برمجة مواقع Next.js، تحسين سيو خرائط جوجل، وإدارة الحملات الإعلانية في السعودية."
      : "Discover Traffic Plus services: Salla & Zid stores, Next.js development, Google Maps SEO, and digital marketing in Saudi Arabia.",
    alternates: alternatesFor(locale, "/services"),
    keywords: [
      "تصميم متاجر سلة",
      "برمجة مواقع السعودية",
      "سيو خرائط جوجل",
      "وكالة تسويق رقمي",
      "تصدر نتائج خرائط جوجل",
      "تصدر نتائج البحث في خرائط جوجل",
      "إعلانات جوجل ماب",
      "حل مشكلة تعليق حساب جوجل ماب",
      "إضافة نشاط تجاري على جوجل ماب",
      "برمجة مواقع في السعودية",
      "تطوير متاجر الكترونية بالرياض",
    ],
  };
}

export default async function ServicesPage() {
  const t = await getTranslations("services");
  const locale = await getLocale();
  const isAr = locale === "ar";
  const settings = await siteSettings();

  const waNumber = settings?.whatsapp?.replace(/[^\d]/g, "");

  return (
    <>
      <PageIntro
        badge={t("badge")}
        title={t("hero_title")}
        description={t("hero_description")}
      />

      <Services />

      {/* Consultation CTA card, per the design */}
      <section className="px-6 pb-24 text-center">
        <div className="mx-auto max-w-[640px] rounded-3xl bg-background-2 px-8 py-12 shadow-[0_30px_60px_-20px_color-mix(in_srgb,var(--accent)_15%,transparent)]">
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

      {/* Kept from the previous page: keyword-rich local-SEO copy the design
          omitted. Dropping it would cost rankings on the exact terms this
          agency sells. Restyled to the new design, wording unchanged. */}
      <section className="bg-background-2 px-6 py-20">
        <div className="mx-auto max-w-[1100px]" dir={isAr ? "rtl" : "ltr"}>
          <h2 className="mb-6 text-2xl font-black text-accent md:text-3xl">
            {isAr
              ? "لماذا تختار ترافيك بلس لخدماتك الرقمية؟"
              : "Why Choose Traffic Plus?"}
          </h2>
          <p className="text-base leading-[1.9] text-maintext">
            {isAr
              ? "في ترافيك بلس، نجمع بين خبرة البرمجة باستخدام Next.js وذكاء التسويق الرقمي. نحن لا نقوم فقط بإنشاء المواقع، بل نبني أدوات لنمو أعمالك في السوق السعودي، من تهيئة متاجر سلة وزد للظهور في محركات البحث إلى إدارة إعلانات جوجل ماب باحترافية."
              : "At Traffic Plus, we combine Next.js development expertise with digital marketing intelligence. We don't just build websites; we build growth tools for your business."}
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-xl font-bold text-accent">
                {isAr
                  ? "إدارة الحملات والنمو الرقمي"
                  : "Campaign Management & Growth"}
              </h3>
              <p className="text-base leading-[1.9] text-subtext">
                {isAr
                  ? "نخطط وندير حملاتك الإعلانية على جوجل ومنصات التواصل باحترافية، مع التركيز على تحقيق أعلى عائد على الاستثمار (ROI) وزيادة مبيعاتك في السوق السعودي."
                  : "We plan and manage your ad campaigns on Google and social media professionally, focusing on achieving the highest ROI and increasing your sales in the Saudi market."}
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-xl font-bold text-accent">
                {isAr ? "تصدر نتائج خرائط جوجل" : "Google Maps SEO Mastery"}
              </h3>
              <p className="text-base leading-[1.9] text-subtext">
                {isAr
                  ? "نطبق استراتيجيات السيو المحلي (Local SEO) لضمان ظهور نشاطك التجاري في المراكز الأولى على خرائط جوجل، مما يزيد من اتصالات العملاء وزيارات المقر."
                  : "We apply advanced Local SEO strategies to ensure your business ranks top on Google Maps, driving more calls and physical store visits."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
