import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  // locales: ["en", "ar"],
  locales: ["ar", "en", "fr", "de", "es", "it", "tr", "hi", "bn", "ur"],

  // Used when no locale matches
  defaultLocale: "ar",
  localeDetection: false,
});
