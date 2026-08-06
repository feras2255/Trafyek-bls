"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { FaGlobe, FaChevronDown, FaCheck } from "react-icons/fa";

const languages = [
  { code: "ar", name: "العربية" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "it", name: "Italiano" },
  { code: "tr", name: "Türkçe" },
  { code: "hi", name: "हिन्दी" },
  { code: "bn", name: "বাংলা" },
  { code: "ur", name: "اردو" },
];

export default function LanguageSwitcher({ isDashboard = false }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage =
    languages.find((lang) => lang.code === locale) || languages[0];

  function switchLanguage(newLocale) {
    router.replace({ pathname }, { locale: newLocale });
    setIsOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // (Dashboard)
  if (isDashboard) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          <FaGlobe className="text-sm" />
          <span>اللغة</span>
        </div>

        <div className="space-y-1 mt-1">
          {languages.map((lang) => {
            const isActive = locale === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`flex w-full items-center justify-between px-3 py-2 rounded-lg text-xs md:text-sm transition-all duration-150 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <span>{lang.name}</span>
                {isActive && <FaCheck className="text-xs" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // (Custom Dropdown)
  return (
    <div className="relative inline-block text-right" ref={dropdownRef}>
      {/* زر فتح القائمة */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="اختر اللغة"
        className="flex items-center gap-2 bg-card border border-primary/30 hover:border-primary/70 rounded-full px-3 py-1.5 text-primary text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
      >
        <FaGlobe className="text-sm shrink-0" />
        <span>{currentLanguage.name}</span>
        <FaChevronDown
          className={`text-[10px] transition-transform duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* القائمة المنسدلة الاحترافية */}
      {isOpen && (
        <div className="absolute left-0 dir-rtl:right-0 dir-rtl:left-auto mt-2 w-32 max-h-60 overflow-y-auto rounded-xl bg-card border border-border shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-150 scrollbar-thin scrollbar-thumb-muted">
          {languages.map((lang) => {
            const isActive = locale === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`flex w-full items-center justify-between px-3.5 py-2 text-xs md:text-sm transition-colors cursor-pointer ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-foreground hover:bg-accent hover:text-secondary"
                }`}
              >
                <span>{lang.name}</span>
                {isActive && (
                  <FaCheck className="text-xs text-primary shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
