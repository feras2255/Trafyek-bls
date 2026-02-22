import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getLocale, getTranslations } from "next-intl/server";
import { siteSettings } from "@/lib/siteSettings"; // أو استخدم supabase مباشرة كما في مثالك
import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";
import SocialLinks from "./SocialLinks";
import PaymentIcons from "./PaymentIcons";
import ContactButtons from "./ContactButtons";

export default async function Footer() {
  const t = await getTranslations("infoSite");
  const locale = await getLocale();

  const settings = await siteSettings();

  if (!settings) return null;

  const quickLinks = [
    { id: 2, title: t("about") || "عن الشركة", href: "/about" },
    { id: 6, title: t("services") || "اتصل بنا", href: "/contact" },
    { id: 3, title: t("privacy") || "سياسة الخصوصية", href: "/privacy-policy" },
    {
      id: 1,
      title: t("terms") || "الشروط والاحكام",
      href: "/terms-conditions",
    },
  ];

  return (
    <footer className="w-full">
      <div className="bg-black text-text pt-12">
        <div className="container mx-auto px-6 md:px-12">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            {/* column 1*/}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold border-b border-gray-700 pb-2 w-full">
                {locale === "ar" ? "من نحن" : "About Us"}
              </h2>
              <p className="text-sm text-justify leading-relaxed text-background-2">
                {locale === "ar"
                  ? settings.description_ar
                  : settings.description_en || settings.description}
              </p>

              {/* buttons */}
              <ContactButtons settings={settings} locale={locale} />
            </div>

            {/* current links */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold border-b border-gray-700 pb-2 w-full">
                {t("quickLinks") || "روابط سريعة"}
              </h3>
              <ul className="grid grid-cols-1 gap-3 text-background-2">
                {quickLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="hover:text-text transition-colors duration-300"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* column 3*/}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold border-b border-gray-700 pb-2 w-full">
                {locale === "ar" ? "تواصل معنا" : "Connect With Us"}
              </h3>
              <SocialLinks links={settings} />
              <div className="mt-4">
                <div className="bg-white px-2 rounded-xl w-full max-w-[200px]">
                  <Image
                    src="/saudia.webp"
                    alt="Saudi Business Center"
                    width={200}
                    height={50}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-800 mt-8"></div>
        </div>
      </div>

      {/* payment icons and copyright */}
      <div className=" py-6">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <PaymentIcons />

          <div className="text-center md:text-left space-y-1">
            <p className="text-sm text-background-2">
              {t("copyright")} &copy; {new Date().getFullYear()}
              <span className="text-ring font-bold mx-1">
                {t("siteName") || "ترافيك بلس"}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              تم التطوير بواسطة{" "}
              <a
                href="https://wa.me/201208651583"
                target="_blank"
                className="underline hover:text-ring transition-colors"
              >
                Abdelrahman
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
