import { siteSettings } from "@/lib/siteSettings";
import {
  FaLocationDot,
  FaPhoneFlip,
  FaWhatsapp,
  FaClock,
} from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import ContactForm from "./_Component/ContactForm";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

export async function generateMetadata() {
  const t = await getTranslations("contact");
  const locale = await getLocale();
  const isAr = locale === "ar";

  const title = isAr
    ? "اتصل بنا | ترافيك بلس - حلول تقنية متكاملة"
    : "Contact Us | Traffic Plus - Integrated Tech Solutions";

  const description = isAr
    ? "تواصل مع فريق ترافيك بلس في السعودية للبدء في مشروعك الرقمي القادم. نحن هنا للإجابة على استفساراتك حول البرمجة والتسويق الرقمي."
    : "Contact Traffic Plus team in Saudi Arabia to start your next digital project. We are here to answer your questions about programming and digital marketing.";

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `https://www.trafyekbls.com/${locale}/contact`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://www.trafyekbls.com/${locale}/contact`,
      siteName: "ترافيك بلس",
      images: [
        {
          url: "/favicon.png",
          width: 800,
          height: 600,
        },
      ],
      locale: isAr ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
    },
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const locale = await getLocale();
  const isAr = locale === "ar";
  const settings = await siteSettings();

  if (!settings) return null;

  const contactInfo = [
    {
      icon: <FaWhatsapp size={26} />,
      title: t("info.whatsapp"),
      value: settings.phone,
      styles: "bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20",
      link: settings.phone
        ? `https://wa.me/${settings.phone.replace(/\s+/g, "")}`
        : "#",
    },
    {
      icon: <MdOutlineEmail size={26} />,
      title: t("info.email"),
      value: settings.email,
      styles: "bg-purple-50 text-purple-600 border-purple-100",
      link: settings.email ? `mailto:${settings.email}` : "#",
    },
    {
      icon: <FaPhoneFlip size={22} />,
      title: t("info.customer_service"),
      value: settings.phone,
      styles: "bg-blue-50 text-blue-600 border-blue-100",
      link: settings.phone ? `tel:${settings.phone}` : "#",
    },
    {
      icon: <FaLocationDot size={24} />,
      title: t("info.location"),
      value: t("info.address"),
      styles: "bg-amber-50 text-amber-600 border-amber-100",
      link: "#",
    },
  ];

  const breadcrumb = [{ label: t("breadcrumb"), href: null }];

  return (
    <section className="bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: isAr ? "اتصل بنا - ترافيك بلس" : "Contact Us - Traffic Plus",
            description: "اتصل بنا | ترافيك بلس - حلول تقنية متكاملة",
            mainEntity: {
              "@type": "Organization",
              name: "ترافيك بلس",
              telephone: settings.phone,
              email: settings.email,
              areaServed: "SA",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: settings.phone,
                contactType: "customer service",
                availableLanguage: ["Arabic", "English"],
              },
            },
          }),
        }}
      />

      <PageHero
        title={t("hero.title")}
        description={t("hero.description")}
        breadcrumbData={breadcrumb}
        isAr={isAr}
      />

      <div
        id="contact"
        className="container mx-auto px-4 md:px-6 py-6 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-14 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="mb-8 relative z-10">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wider uppercase mb-3">
                {t("form.badge")}
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                {t("form.title_part1")}{" "}
                <span className="text-primary">
                  {t("form.title_highlight")}
                </span>
              </h2>
              <p className="text-slate-500 text-sm md:text-base">
                {t("form.description")}
              </p>
            </div>

            <ContactForm isAr={isAr} />
          </div>

          {/* info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 space-y-8">
              <div>
                <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold tracking-wider uppercase mb-3">
                  {isAr ? "ابق على تواصل" : "Get In Touch"}
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 tracking-tight">
                  {t("info.title")}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                  {t("info.description")}
                </p>
              </div>

              {/* contact info */}
              <div className="grid grid-cols-1 gap-4">
                {contactInfo.map((info, idx) => (
                  <Link
                    href={info.link}
                    key={idx}
                    aria-label={info.title}
                    className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 bg-slate-50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div
                      className={`flex-shrink-size w-14 h-14 rounded-xl flex items-center justify-center border transition-transform duration-500 group-hover:scale-105 ${info.styles}`}
                    >
                      {info.icon}
                    </div>

                    <div className="flex flex-col overflow-hidden">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                        {info.title}
                      </span>
                      <p className="text-slate-800 font-bold text-sm md:text-base truncate">
                        {info.value}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* working hours */}
              <div className="bg-[#1E293B] text-white rounded-2xl p-6 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-primary">
                    <FaClock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg mb-1">
                      {t("working_hours.title")}
                    </h4>
                    <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                      {t("working_hours.days")}{" "}
                      <span className="text-white font-semibold">
                        {t("working_hours.time")}
                      </span>
                    </p>
                    <span className="inline-block mt-2 text-[11px] text-slate-400">
                      {t("working_hours.note")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
