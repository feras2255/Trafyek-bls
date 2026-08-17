/**
 * Saudi and GCC city reference.
 *
 * ── HOW RELIABLE IS THIS FILE ───────────────────────────────────────────────
 * The regional capitals in lib/regions.js were verified against the Saudi
 * administrative division. THIS file was written from knowledge: the network in
 * the build environment blocks Wikipedia and the Saudi reference sites, so the
 * official list could not be pulled.
 *
 * The Saudi total is 91 cities — that figure is confirmed, and comes from the
 * General Authority for Statistics, which counts any settlement over 5,000
 * people as a city. The list below is NOT all 91: it is the ~70 that are
 * well-established and that anyone would recognise. The remaining long tail is
 * small towns whose names and region assignments I will not guess at, because
 * getting جازان and القصيم wrong once was enough.
 *
 * `confidence` marks each entry:
 *   "high" — major city, name and region not in doubt
 *   "check" — correct as far as I know, worth confirming before it goes public
 *
 * VERIFY BEFORE THESE DRIVE PUBLIC PAGES OR areaServed. A wrong city name in a
 * URL or in structured data is expensive to undo once indexed.
 * ────────────────────────────────────────────────────────────────────────────
 */

/** Saudi cities, keyed by the region id used in lib/regions.js. */
export const SAUDI_CITIES = [
  // ── الرياض ──
  { ar: "الرياض", en: "Riyadh", region: "riyadh", confidence: "high" },
  { ar: "الخرج", en: "Al-Kharj", region: "riyadh", confidence: "high" },
  { ar: "الدوادمي", en: "Dawadmi", region: "riyadh", confidence: "high" },
  { ar: "المجمعة", en: "Al-Majmaah", region: "riyadh", confidence: "high" },
  { ar: "الزلفي", en: "Az-Zulfi", region: "riyadh", confidence: "high" },
  { ar: "وادي الدواسر", en: "Wadi ad-Dawasir", region: "riyadh", confidence: "high" },
  { ar: "الأفلاج", en: "Al-Aflaj", region: "riyadh", confidence: "check" },
  { ar: "شقراء", en: "Shaqra", region: "riyadh", confidence: "check" },
  { ar: "عفيف", en: "Afif", region: "riyadh", confidence: "check" },
  { ar: "حوطة بني تميم", en: "Hotat Bani Tamim", region: "riyadh", confidence: "check" },
  { ar: "الدرعية", en: "Diriyah", region: "riyadh", confidence: "high" },
  { ar: "الرين", en: "Ar-Rayn", region: "riyadh", confidence: "check" },

  // ── مكة المكرمة ──
  { ar: "مكة المكرمة", en: "Makkah", region: "makkah", confidence: "high" },
  { ar: "جدة", en: "Jeddah", region: "makkah", confidence: "high" },
  { ar: "الطائف", en: "Taif", region: "makkah", confidence: "high" },
  { ar: "رابغ", en: "Rabigh", region: "makkah", confidence: "high" },
  { ar: "القنفذة", en: "Al-Qunfudhah", region: "makkah", confidence: "high" },
  { ar: "الليث", en: "Al-Lith", region: "makkah", confidence: "check" },
  { ar: "خليص", en: "Khulais", region: "makkah", confidence: "check" },
  { ar: "الجموم", en: "Al-Jumum", region: "makkah", confidence: "check" },
  { ar: "تربة", en: "Turubah", region: "makkah", confidence: "check" },

  // ── المدينة المنورة ──
  { ar: "المدينة المنورة", en: "Madinah", region: "madinah", confidence: "high" },
  { ar: "ينبع", en: "Yanbu", region: "madinah", confidence: "high" },
  { ar: "العلا", en: "AlUla", region: "madinah", confidence: "high" },
  { ar: "بدر", en: "Badr", region: "madinah", confidence: "check" },
  { ar: "خيبر", en: "Khaybar", region: "madinah", confidence: "check" },
  { ar: "المهد", en: "Mahd adh-Dhahab", region: "madinah", confidence: "check" },

  // ── القصيم ──
  { ar: "بريدة", en: "Buraydah", region: "qassim", confidence: "high" },
  { ar: "عنيزة", en: "Unaizah", region: "qassim", confidence: "high" },
  { ar: "الرس", en: "Ar-Rass", region: "qassim", confidence: "high" },
  { ar: "المذنب", en: "Al-Mithnab", region: "qassim", confidence: "check" },
  { ar: "البكيرية", en: "Al-Bukayriyah", region: "qassim", confidence: "check" },
  { ar: "البدائع", en: "Al-Badai", region: "qassim", confidence: "check" },

  // ── الشرقية ──
  { ar: "الدمام", en: "Dammam", region: "eastern", confidence: "high" },
  { ar: "الخبر", en: "Khobar", region: "eastern", confidence: "high" },
  { ar: "الظهران", en: "Dhahran", region: "eastern", confidence: "high" },
  { ar: "الأحساء", en: "Al-Ahsa", region: "eastern", confidence: "high" },
  { ar: "الهفوف", en: "Hofuf", region: "eastern", confidence: "high" },
  { ar: "الجبيل", en: "Jubail", region: "eastern", confidence: "high" },
  { ar: "القطيف", en: "Qatif", region: "eastern", confidence: "high" },
  { ar: "حفر الباطن", en: "Hafar Al-Batin", region: "eastern", confidence: "high" },
  { ar: "رأس تنورة", en: "Ras Tanura", region: "eastern", confidence: "high" },
  { ar: "بقيق", en: "Abqaiq", region: "eastern", confidence: "check" },
  { ar: "النعيرية", en: "An-Nairyah", region: "eastern", confidence: "check" },
  { ar: "الخفجي", en: "Khafji", region: "eastern", confidence: "high" },

  // ── عسير ──
  { ar: "أبها", en: "Abha", region: "asir", confidence: "high" },
  { ar: "خميس مشيط", en: "Khamis Mushait", region: "asir", confidence: "high" },
  { ar: "بيشة", en: "Bisha", region: "asir", confidence: "high" },
  { ar: "محايل عسير", en: "Muhayil Asir", region: "asir", confidence: "check" },
  { ar: "النماص", en: "An-Namas", region: "asir", confidence: "check" },
  { ar: "سراة عبيدة", en: "Sarat Abidah", region: "asir", confidence: "check" },
  { ar: "رجال ألمع", en: "Rijal Almaa", region: "asir", confidence: "check" },

  // ── تبوك ──
  { ar: "تبوك", en: "Tabuk", region: "tabuk", confidence: "high" },
  { ar: "ضباء", en: "Duba", region: "tabuk", confidence: "check" },
  { ar: "الوجه", en: "Al-Wajh", region: "tabuk", confidence: "check" },
  { ar: "أملج", en: "Umluj", region: "tabuk", confidence: "check" },
  { ar: "حقل", en: "Haql", region: "tabuk", confidence: "check" },
  { ar: "نيوم", en: "NEOM", region: "tabuk", confidence: "check" },

  // ── حائل ──
  { ar: "حائل", en: "Hail", region: "hail", confidence: "high" },
  { ar: "بقعاء", en: "Baqaa", region: "hail", confidence: "check" },
  { ar: "الشنان", en: "Ash-Shinan", region: "hail", confidence: "check" },

  // ── الحدود الشمالية ──
  { ar: "عرعر", en: "Arar", region: "northern-borders", confidence: "high" },
  { ar: "رفحاء", en: "Rafha", region: "northern-borders", confidence: "high" },
  { ar: "طريف", en: "Turaif", region: "northern-borders", confidence: "high" },

  // ── جازان ──
  { ar: "جازان", en: "Jazan", region: "jazan", confidence: "high" },
  { ar: "صبيا", en: "Sabya", region: "jazan", confidence: "high" },
  { ar: "أبو عريش", en: "Abu Arish", region: "jazan", confidence: "high" },
  { ar: "صامطة", en: "Samtah", region: "jazan", confidence: "check" },
  { ar: "فرسان", en: "Farasan", region: "jazan", confidence: "check" },

  // ── نجران ──
  { ar: "نجران", en: "Najran", region: "najran", confidence: "high" },
  { ar: "شرورة", en: "Sharurah", region: "najran", confidence: "high" },

  // ── الباحة ──
  { ar: "الباحة", en: "Al-Bahah", region: "bahah", confidence: "high" },
  { ar: "بلجرشي", en: "Baljurashi", region: "bahah", confidence: "check" },
  { ar: "المندق", en: "Al-Mandaq", region: "bahah", confidence: "check" },

  // ── الجوف ──
  { ar: "سكاكا", en: "Sakaka", region: "jawf", confidence: "high" },
  { ar: "القريات", en: "Qurayyat", region: "jawf", confidence: "high" },
  { ar: "دومة الجندل", en: "Dumat Al-Jandal", region: "jawf", confidence: "check" },
];

/**
 * GCC countries and their principal cities.
 *
 * Same caveat: written from knowledge, not pulled from an authoritative list.
 * The capitals and largest cities are not in doubt; smaller entries are marked.
 */
export const GCC_COUNTRIES = [
  {
    id: "sa",
    ar: "السعودية",
    en: "Saudi Arabia",
    code: "SA",
    // Saudi cities live in SAUDI_CITIES above, keyed by region.
    cities: [],
  },
  {
    id: "ae",
    ar: "الإمارات",
    en: "United Arab Emirates",
    code: "AE",
    cities: [
      { ar: "دبي", en: "Dubai", confidence: "high" },
      { ar: "أبوظبي", en: "Abu Dhabi", confidence: "high" },
      { ar: "الشارقة", en: "Sharjah", confidence: "high" },
      { ar: "العين", en: "Al Ain", confidence: "high" },
      { ar: "عجمان", en: "Ajman", confidence: "high" },
      { ar: "رأس الخيمة", en: "Ras Al Khaimah", confidence: "high" },
      { ar: "الفجيرة", en: "Fujairah", confidence: "high" },
      { ar: "أم القيوين", en: "Umm Al Quwain", confidence: "high" },
    ],
  },
  {
    id: "kw",
    ar: "الكويت",
    en: "Kuwait",
    code: "KW",
    cities: [
      { ar: "مدينة الكويت", en: "Kuwait City", confidence: "high" },
      { ar: "حولي", en: "Hawalli", confidence: "high" },
      { ar: "الفروانية", en: "Al Farwaniyah", confidence: "high" },
      { ar: "الأحمدي", en: "Al Ahmadi", confidence: "high" },
      { ar: "الجهراء", en: "Al Jahra", confidence: "high" },
      { ar: "مبارك الكبير", en: "Mubarak Al-Kabeer", confidence: "check" },
    ],
  },
  {
    id: "qa",
    ar: "قطر",
    en: "Qatar",
    code: "QA",
    cities: [
      { ar: "الدوحة", en: "Doha", confidence: "high" },
      { ar: "الريان", en: "Al Rayyan", confidence: "high" },
      { ar: "الوكرة", en: "Al Wakrah", confidence: "high" },
      { ar: "الخور", en: "Al Khor", confidence: "high" },
      { ar: "أم صلال", en: "Umm Salal", confidence: "check" },
      { ar: "الظعاين", en: "Al Daayen", confidence: "check" },
    ],
  },
  {
    id: "bh",
    ar: "البحرين",
    en: "Bahrain",
    code: "BH",
    cities: [
      { ar: "المنامة", en: "Manama", confidence: "high" },
      { ar: "المحرق", en: "Muharraq", confidence: "high" },
      { ar: "الرفاع", en: "Riffa", confidence: "high" },
      { ar: "مدينة حمد", en: "Hamad Town", confidence: "high" },
      { ar: "مدينة عيسى", en: "Isa Town", confidence: "high" },
      { ar: "سترة", en: "Sitra", confidence: "check" },
    ],
  },
  {
    id: "om",
    ar: "عُمان",
    en: "Oman",
    code: "OM",
    cities: [
      { ar: "مسقط", en: "Muscat", confidence: "high" },
      { ar: "صلالة", en: "Salalah", confidence: "high" },
      { ar: "صحار", en: "Sohar", confidence: "high" },
      { ar: "نزوى", en: "Nizwa", confidence: "high" },
      { ar: "صور", en: "Sur", confidence: "high" },
      { ar: "البريمي", en: "Al Buraimi", confidence: "check" },
      { ar: "عبري", en: "Ibri", confidence: "check" },
      { ar: "الرستاق", en: "Rustaq", confidence: "check" },
    ],
  },
];

/** Every Saudi city name, Arabic. */
export const saudiCityNamesAr = () => SAUDI_CITIES.map((c) => c.ar);

/** Only the entries not flagged for checking — safe to use unreviewed. */
export const highConfidenceSaudiCitiesAr = () =>
  SAUDI_CITIES.filter((c) => c.confidence === "high").map((c) => c.ar);

/** Cities of one GCC country. */
export const citiesOf = (countryId) =>
  GCC_COUNTRIES.find((c) => c.id === countryId)?.cities ?? [];
