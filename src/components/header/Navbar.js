"use client";

import Link from "next/link";
import { use, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

export default function Navbar({ settings }) {
  const t = useTranslations("infoSite");

  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { id: "nav-1", title: t("home"), href: "/" },
    { id: "nav-2", title: t("about"), href: "/about" },
    { id: "nav-3", title: t("services"), href: "/services" },
    { id: "nav-4", title: t("projects"), href: "/projects" },
    { id: "nav-5", title: t("contact"), href: "/contact" },
  ];

  return (
    <nav className="w-full">
      <div className="flex items-center justify-between w-full">
        <Link href="/" className="relative w-24 h-10 lg:w-32 lg:h-12">
          <Image
            src={settings?.image_url || "/t-logo.webp"}
            alt="logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        {/* desktop links */}
        <ul className="hidden md:flex items-center gap-x-4 lg:gap-x-6 ">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className="text-maintext text-sm lg:text-xl font-bold hover:text-accent transition-colors"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* contact links */}
        <div className="flex items-center gap-x-4">
          <div className="hidden md:flex gap-x-4">
            <LanguageSwitcher isDashboard={false} />
            <Link
              href={`https://wa.me/${settings?.whatsapp || ""}`}
              className="text-sm md:text-base bg-primary text-text px-5 py-2 rounded-lg font-bold hover:bg-opacity-90 transition-all"
            >
              {t("contact")}
            </Link>
          </div>

          {/* mobile menu button */}
          <button
            className="md:hidden text-maintext"
            onClick={() => setIsOpen(true)}
            aria-label="فتح القائمة"
          >
            <FiMenu size={28} />
          </button>
        </div>
      </div>

      {/* mobile menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 z-50 overflow-auto ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-5 left-5 text-maintext"
          onClick={() => setIsOpen(false)}
        >
          <FiX size={28} />
        </button>

        <div className="flex flex-col px-5 ">
          <div className="relative w-32 h-16 my-6">
            <Image
              src={settings?.image_url || "/t-logo.webp"}
              alt="logo"
              fill
              className="object-contain"
            />
          </div>

          <ul className="flex flex-col gap-y-5 text-maintext text-xl font-bold">
            {links.map((link) => (
              <li key={link.id} className="border-b border-border pb-2">
                <Link href={link.href} onClick={() => setIsOpen(false)}>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-y-4">
            <LanguageSwitcher isDashboard={false} />

            <Link
              href={`https://wa.me/${settings?.whatsapp || ""}`}
              className="text-center bg-primary text-text py-3 rounded-lg font-semibold"
            >
              {t("contact")}
            </Link>
          </div>
        </div>
      </div>

      {/* overlay background */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
