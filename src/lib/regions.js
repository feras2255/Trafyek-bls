/**
 * Saudi administrative regions and their capitals.
 *
 * Reference data for the planned city pages and for LocalBusiness areaServed.
 * Verified against the Saudi administrative division, not written from memory —
 * two mistakes that check caught:
 *   - القصيم is a REGION, not a city. Its capital is بريدة. Targeting a page at
 *     "القصيم" as though it were a city would be wrong.
 *   - The official name is جازان, not the common variant جيزان.
 *
 * The Kingdom has 13 regions. Region names are the administrative names;
 * `capital` is the seat of each region.
 */
export const SAUDI_REGIONS = [
  { id: "riyadh",          ar: "الرياض",            en: "Riyadh",            capitalAr: "الرياض",        capitalEn: "Riyadh" },
  { id: "makkah",          ar: "مكة المكرمة",        en: "Makkah",            capitalAr: "مكة المكرمة",   capitalEn: "Makkah" },
  { id: "madinah",         ar: "المدينة المنورة",    en: "Madinah",           capitalAr: "المدينة المنورة", capitalEn: "Madinah" },
  { id: "qassim",          ar: "القصيم",             en: "Al-Qassim",         capitalAr: "بريدة",         capitalEn: "Buraydah" },
  { id: "eastern",         ar: "الشرقية",            en: "Eastern Province",  capitalAr: "الدمام",        capitalEn: "Dammam" },
  { id: "asir",            ar: "عسير",               en: "Asir",              capitalAr: "أبها",          capitalEn: "Abha" },
  { id: "tabuk",           ar: "تبوك",               en: "Tabuk",             capitalAr: "تبوك",          capitalEn: "Tabuk" },
  { id: "hail",            ar: "حائل",               en: "Hail",              capitalAr: "حائل",          capitalEn: "Hail" },
  { id: "northern-borders",ar: "الحدود الشمالية",    en: "Northern Borders",  capitalAr: "عرعر",          capitalEn: "Arar" },
  { id: "jazan",           ar: "جازان",              en: "Jazan",             capitalAr: "جازان",         capitalEn: "Jazan" },
  { id: "najran",          ar: "نجران",              en: "Najran",            capitalAr: "نجران",         capitalEn: "Najran" },
  { id: "bahah",           ar: "الباحة",             en: "Al-Bahah",          capitalAr: "الباحة",        capitalEn: "Al-Bahah" },
  { id: "jawf",            ar: "الجوف",              en: "Al-Jawf",           capitalAr: "سكاكا",         capitalEn: "Sakaka" },
];

/**
 * Major cities that are NOT a regional capital but are large enough to matter
 * for local search. Kept separate so nothing here is mistaken for a region.
 */
export const MAJOR_CITIES = [
  { id: "jeddah", ar: "جدة",       en: "Jeddah", region: "makkah" },
  { id: "khobar", ar: "الخبر",     en: "Khobar", region: "eastern" },
  { id: "taif",   ar: "الطائف",    en: "Taif",   region: "makkah" },
  { id: "ahsa",   ar: "الأحساء",   en: "Al-Ahsa", region: "eastern" },
];

/**
 * Cities this business actually serves, for LocalBusiness `areaServed`.
 *
 * DELIBERATELY EMPTY. areaServed is a factual claim in structured data about
 * where the business operates, so it must come from the business, not from a
 * plausible-looking guess. While this is empty, localBusinessSchema() falls
 * back to country-level (Saudi Arabia), which the site's own copy supports.
 *
 * TO FILL IN: add the Arabic city names you genuinely serve, e.g.
 *   export const AREA_SERVED = ["الرياض", "جدة", "الدمام"];
 * Use the spellings from SAUDI_REGIONS / MAJOR_CITIES above so they match what
 * people search for.
 */
export const AREA_SERVED = [];
