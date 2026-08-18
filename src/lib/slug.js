/**
 * Slugify, matching the SQL `public.slugify()` in migration 006 exactly.
 *
 * Both exist on purpose: the SQL version backfills rows that already exist, and
 * this one runs in the dashboard so a newly created row gets a slug the same
 * way. If you change one, change the other — a mismatch produces two URL styles
 * for the same kind of content.
 *
 * Arabic letters are KEPT rather than transliterated. Browsers percent-encode
 * them in the address bar but display them correctly, and they match what
 * people in this market actually type into a search box.
 */
// Arabic-Indic (٠-٩) and extended Arabic-Indic (۰-۹) digits, mapped to 0-9.
// Without this, "أفضل ١٠ شركات" silently loses the number entirely.
const ARABIC_DIGITS = /[٠-٩۰-۹]/g;
const toLatinDigit = (d) => String(d.codePointAt(0) & 0x0f);

// Harakat (َ ِ ُ ّ ْ …), superscript alef, and tatweel. These are REMOVED rather
// than treated as separators: replacing them with a hyphen tore words apart —
// "السِّيو" became "الس-يو".
const ARABIC_MARKS = /[ً-ْٰـ]/g;

export function slugify(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(ARABIC_DIGITS, toLatinDigit)
    .replace(ARABIC_MARKS, "")
    // keep the Arabic letter block, latin letters and digits; everything else
    // becomes a separator
    .replace(/[^ء-يa-z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Slug for a new row, falling back to a prefixed id when the title produces
 * nothing usable (punctuation-only or empty titles).
 *
 * @param title    preferred source, normally the Arabic title
 * @param fallback prefix used when the title yields an empty slug
 */
export function slugFor(title, fallback = "item") {
  const slug = slugify(title);
  return slug || `${fallback}-${Date.now()}`;
}

/**
 * True when a route segment looks like a bare numeric id rather than a slug.
 *
 * The routing change that follows migration 006 uses this to decide whether to
 * look a row up by id (old, still-indexed URLs) or by slug, and to 301 the id
 * form to the slug form.
 */
export function isNumericId(segment) {
  return /^\d+$/.test(String(segment ?? ""));
}
