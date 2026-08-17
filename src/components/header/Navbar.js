"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

// The approved design draws the brand as a gradient tile with a rising-trend
// glyph beside the wordmark. It's the fallback when no logo is set in the
// dashboard, so the settings-driven logo keeps working.
function BrandMark() {
  return (
    <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[9px] bg-linear-135 from-accent to-primary shadow-[0_8px_20px_-6px_color-mix(in_srgb,var(--primary)_50%,transparent)]">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 17l6-6 4 4 6-7" />
      </svg>
    </span>
  );
}

export default function Navbar({ settings }) {
  const t = useTranslations("infoSite");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { id: "nav-1", title: t("home"), href: "/" },
    { id: "nav-2", title: t("about"), href: "/about-us" },
    { id: "nav-3", title: t("services"), href: "/services" },
    { id: "nav-4", title: t("ourwork"), href: "/ourwork" },
    { id: "nav-5", title: t("blog"), href: "/blogs" },
    { id: "nav-6", title: t("contact"), href: "/contact" },
  ];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close the drawer on navigation so it never stays open over the new page.
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // A drawer that scrolls the page behind it reads as broken on touch.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const whatsappHref = settings?.whatsapp
    ? `https://wa.me/${settings.whatsapp}`
    : "/contact";

  return (
    <nav className="w-full">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={t("siteName")}
          className="flex items-center gap-2.5"
        >
          {settings?.image_url ? (
            <span className="relative block h-10 w-24 lg:w-32">
              <Image
                src={settings.image_url}
                alt={t("siteName")}
                fill
                sizes="128px"
                className="object-contain"
                priority
              />
            </span>
          ) : (
            <>
              <BrandMark />
              <span className="text-xl font-black text-accent">
                ترافيك <span className="text-primary">بلس</span>
              </span>
            </>
          )}
        </Link>

        {/* desktop links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-[15px] font-bold transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary" : "text-maintext"
                }`}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher isDashboard={false} />
            <Link
              href={whatsappHref}
              className="inline-flex rounded-[10px] bg-linear-135 from-accent to-primary px-[22px] py-[11px] text-sm font-extrabold text-text shadow-[0_10px_24px_-8px_color-mix(in_srgb,var(--primary)_60%,transparent)] transition-transform hover:-translate-y-0.5"
            >
              {t("contact")}
            </Link>
          </div>

          <button
            type="button"
            className="p-1.5 text-accent lg:hidden"
            onClick={() => setIsOpen(true)}
            aria-label={t("openMenu")}
            aria-expanded={isOpen}
          >
            <FiMenu size={26} />
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <div
        className={`fixed top-0 right-0 z-60 flex h-full w-[280px] flex-col gap-[22px] bg-background p-6 shadow-[-10px_0_40px_rgba(0,0,0,0.15)] transition-transform duration-300 lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <button
          type="button"
          className="self-start text-accent"
          onClick={() => setIsOpen(false)}
          aria-label={t("closeMenu")}
          tabIndex={isOpen ? 0 : -1}
        >
          <FiX size={26} />
        </button>

        <ul className="flex flex-col gap-5">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                tabIndex={isOpen ? 0 : -1}
                className={`text-[17px] font-extrabold ${
                  isActive(link.href) ? "text-primary" : "text-maintext"
                }`}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <LanguageSwitcher isDashboard={false} />

        <Link
          href={whatsappHref}
          tabIndex={isOpen ? 0 : -1}
          className="mt-auto rounded-[10px] bg-linear-135 from-accent to-primary p-3.5 text-center text-[15px] font-extrabold text-text"
        >
          {t("contact")}
        </Link>
      </div>

      {isOpen && (
        <button
          type="button"
          aria-label={t("closeMenu")}
          className="fixed inset-0 z-55 bg-black/45 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
