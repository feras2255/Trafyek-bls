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
 * Cities this business serves, for LocalBusiness `areaServed`.
 *
 * Confirmed by the business as nationwide coverage across Saudi Arabia, so this
 * is derived from the verified lists above rather than typed out by hand — the
 * official spellings are guaranteed, and adding a region here later keeps the
 * schema in sync automatically.
 *
 * Note this is a factual claim search engines read as fact. If coverage ever
 * narrows, edit this list; the schema falls back to country level when empty.
 */
export const AREA_SERVED = [
  ...SAUDI_REGIONS.map((region) => region.capitalAr),
  ...MAJOR_CITIES.map((city) => city.ar),
];

/** Same list in English, for the /en locale. */
export const AREA_SERVED_EN = [
  ...SAUDI_REGIONS.map((region) => region.capitalEn),
  ...MAJOR_CITIES.map((city) => city.en),
];
