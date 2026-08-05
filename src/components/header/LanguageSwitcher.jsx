// "use client";

// import { usePathname, useRouter } from "@/i18n/navigation";
// import { useLocale } from "next-intl";
// import { FaGlobe } from "react-icons/fa";

// export default function LanguageSwitcher({ isDashboard = false }) {
//   const locale = useLocale();
//   const router = useRouter();
//   const pathname = usePathname();

//   const nextLocale = locale === "ar" ? "en" : "ar";

//   function switchLanguage(newLocale) {
//     router.replace({ pathname }, { locale: newLocale });
//   }

//   if (isDashboard) {
//     return (
//       <button
//         onClick={() => switchLanguage(nextLocale)}
//         aria-label="تغيير اللغة"
//         className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-accent hover:text-text transition cursor-pointer"
//       >
//         <FaGlobe className="w-4 h-4" />

//         {locale === "ar" ? "English" : "Arabic"}
//       </button>
//     );
//   }

//   return (
//     <button
//       className="transition-base bg-card border border-primary text-primary font-semibold py-2 px-4 outline-none rounded-md flex items-center justify-center cursor-pointer"
//       onClick={() => switchLanguage(nextLocale)}
//       aria-label="تغيير اللغة"
//     >
//       {locale === "ar" ? "English" : "Arabic"}
//     </button>
//   );
// }

"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { FaGlobe } from "react-icons/fa";

const languages = [
  { code: "ar", name: "العربية" },
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "es", name: "Español" },
  { code: "it", name: "Italiano" },
  { code: "tr", name: "Türkçe" },
];

export default function LanguageSwitcher({ isDashboard = false }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLanguage(newLocale) {
    router.replace({ pathname }, { locale: newLocale });
  }

  if (isDashboard) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-1 px-2 py-1.5 text-sm text-muted-foreground">
          <FaGlobe className="" />
          اللغة
        </div>

        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={`flex w-full items-center justify-between px-2 py-1 text-xs md:text-sm transition cursor-pointer hover:bg-accent ${
              locale === lang.code ? "bg-primary text-white" : "hover:text-text"
            }`}
          >
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <select
        value={locale}
        onChange={(e) => switchLanguage(e.target.value)}
        className="w-auto bg-card border border-primary/40 rounded-md py-1.5 pl-8 pr-3 text-primary text-xs md:text-sm font-semibold cursor-pointer outline-none inline-block"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>

      <FaGlobe className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-primary text-xs" />
    </div>
  );
}
