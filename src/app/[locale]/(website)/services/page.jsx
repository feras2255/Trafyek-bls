import PageHero from "@/components/ui/PageHero";
import { getLocale, getTranslations } from "next-intl/server";
import Services from "@/components/home/Services";
import Link from "next/link";

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

  const breadcrumb = [{ label: isAr ? "الخدمات" : "Services", href: null }];

  return (
    <main>
      <PageHero
        title={t("title")}
        description={t("description")}
        breadcrumbData={breadcrumb}
        isAr={isAr}
        showButtons={true}
        scrollToId="projects-grid"
      />

      <div id="projects-grid" className="py-10">
        <Services />
      </div>

      {/* <section className="bg-primary/20 mb-6 py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="prose prose-lg max-w-none" dir={isAr ? "rtl" : "ltr"}>
            <h2 className="text-xl md:text-4xl font-bold text-accent mb-6">
              {isAr
                ? "لماذا تختار ترافيك بلس لخدماتك الرقمية؟"
                : "Why Choose Traffic Plus?"}
            </h2>
            <p className="text-sm md:text-lg text-justify text-maintext leading-relaxed">
              {isAr
                ? "في ترافيك بلس، نجمع بين خبرة البرمجة باستخدام Next.js وذكاء التسويق الرقمي. نحن لا نقوم فقط بإنشاء المواقع، بل نبني أدوات لنمو أعمالك في السوق السعودي، من تهيئة متاجر سلة وزد للظهور في محركات البحث إلى إدارة إعلانات جوجل ماب باحترافية."
                : "At Traffic Plus, we combine Next.js development expertise with digital marketing intelligence. We don't just build websites; we build growth tools for your business."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {isAr
                    ? "إدارة الحملات والنمو الرقمي"
                    : "Campaign Management & Growth"}
                </h3>
                <p className="text-sm md:text-lg text-justify text-maintext">
                  {isAr
                    ? "نخطط وندير حملاتك الإعلانية على جوجل ومنصات التواصل باحترافية، مع التركيز على تحقيق أعلى عائد على الاستثمار (ROI) وزيادة مبيعاتك في السوق السعودي."
                    : "We plan and manage your ad campaigns on Google and social media professionally, focusing on achieving the highest ROI and increasing your sales in the Saudi market."}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  {isAr ? "تصدر نتائج خرائط جوجل" : "Google Maps SEO Mastery"}
                </h3>
                <p className="text-sm md:text-lg text-justify text-maintext">
                  {isAr
                    ? "نطبق استراتيجيات السيو المحلي (Local SEO) لضمان ظهور نشاطك التجاري في المراكز الأولى على خرائط جوجل، مما يزيد من اتصالات العملاء وزيارات المقر."
                    : "We apply advanced Local SEO strategies to ensure your business ranks top on Google Maps, driving more calls and physical store visits."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-[#F9F7FC] border border-[#ECE5F5] rounded-[2.5rem] p-8 md:p-12 text-center shadow-sm">
          {/* العنوان الرئيسي */}
          <h3 className="text-2xl md:text-3xl font-black text-[#1E293B] mb-3">
            {isAr
              ? "لست متأكداً من الخدمة المناسبة لك؟"
              : "Not sure which service is right for you?"}
          </h3>

          <p className="text-sm md:text-base text-gray-500 mb-8">
            {isAr
              ? "تواصل معنا وسنساعدك على اختيار الحل الأنسب لعملك."
              : "Contact us and we'll help you choose the best solution for your business."}
          </p>

          <div>
            <Link
              href="https://wa.me/966530446151"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-purple-900/10 transition-all duration-300 text-sm md:text-base"
            >
              {isAr ? "استشارة مجانية" : "Free Consultation"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
