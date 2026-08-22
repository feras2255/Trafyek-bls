import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { siteSettings } from "@/lib/siteSettings";
import SocialLinks from "./SocialLinks";
import PaymentIcons from "./PaymentIcons";
import ContactButtons from "./ContactButtons";
import { IoIosArrowBack } from "react-icons/io";

export default async function Footer() {
  const t = await getTranslations("infoSite");
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const settings = (await siteSettings()) || {};

  const quickLinks = [
    { id: 2, title: t("about") || "عن الشركة", href: "/about-us" },
    { id: 6, title: t("services") || "خدماتنا", href: "/services" },
    {
      id: 3,
      title: t("privacy") || "سياسة الخصوصية",
      href: "/pages/privacy-policy",
    },
    {
      id: 1,
      title: t("terms") || "الشروط والأحكام",
      href: "/pages/terms-conditions",
    },
  ];

  return (
    <footer className="w-full bg-maintext text-text border-t border-white/5">
      <div className="pt-20 pb-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Column 1: Brand Strategy (Takes more space) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary rounded-lg inline-block"></span>
                  {t("siteName") || "ترافيك بلس"}
                </h2>
                <p className="text-third text-base leading-relaxed max-w-md">
                  {isRtl
                    ? settings.description_ar
                    : settings.description_en || settings.description_ar}
                </p>
              </div>

              <SocialLinks links={settings} />
            </div>

            {/* Column 2: Quick Navigation */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="text-lg font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
                {t("quickLinks") || "روابط سريعة"}
              </h3>
              <ul className="flex flex-col gap-4">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      aria-label={link.title}
                      className="text-third hover:text-brand-orange hover:translate-x-[-8px] transition-all duration-300 font-medium flex items-center gap-x-2"
                    >
                      <IoIosArrowBack />
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Trust & Social */}
            <div className="lg:col-span-4 space-y-4">
              <div className="space-y-6">
                <h3 className="text-lg font-bold uppercase tracking-widest border-b border-primary/20 pb-2 inline-block">
                  {isRtl ? "تواصل معنا" : "Connect"}
                </h3>
                <div className="flex justify-start">
                  <ContactButtons settings={settings} locale={locale} />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Payment Icons */}
            <div className=" order-2 md:order-1">
              <PaymentIcons />
            </div>

            {/* Copyright & Dev Credit */}
            <div className="text-center md:text-left space-y-2 order-1 md:order-2">
              <div className="text-sm text-third font-medium">
                {t("copyright")} &copy; {new Date().getFullYear()}
                <span className="text-brand-orange font-black mx-2 uppercase tracking-tight">
                  {t("siteName") || "Traffic Plus"}
                </span>
              </div>
              {/* <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-bold">
                Designed & Built with passion by{" "}
                <a
                  href="https://wa.me/201208651583"
                  target="_blank"
                  className="text-white hover:text-primary transition-colors underline underline-offset-4"
                >
                  Abdelrahman
                </a>
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
