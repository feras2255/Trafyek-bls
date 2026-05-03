"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { FaGlobe } from "react-icons/fa";

export default function LanguageSwitcher({ isDashboard = false }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === "ar" ? "en" : "ar";

  function switchLanguage(newLocale) {
    router.replace({ pathname }, { locale: newLocale });
  }

  if (isDashboard) {
    return (
      <button
        onClick={() => switchLanguage(nextLocale)}
        aria-label="تغيير اللغة"
        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-accent hover:text-text transition cursor-pointer"
      >
        <FaGlobe className="w-4 h-4" />

        {locale === "ar" ? "English" : "Arabic"}
      </button>
    );
  }

  return (
    <button
      className="transition-base bg-card border border-primary text-primary font-semibold py-2 px-4 outline-none rounded-md flex items-center justify-center cursor-pointer"
      onClick={() => switchLanguage(nextLocale)}
      aria-label="تغيير اللغة"
    >
      {locale === "ar" ? "English" : "Arabic"}
    </button>
  );
}
