import { cache } from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * Which legal pages actually exist in the database right now.
 *
 * The footer links to /pages/privacy-policy and /pages/terms-conditions on
 * every page of the site. Those rows are created by migration 007, which is
 * applied by a human — so between deploying and running it, both links 404
 * sitewide. A 404 reachable from every page is a genuine trust and crawl
 * problem, and the audit already found that terms-conditions may never have
 * existed at all: the old /pages/[slug] component ignored its route param and
 * always queried privacy-policy, so nobody would have noticed the row missing.
 *
 * Wrapped in cache() so the footer costs one query per request no matter how
 * many components ask, matching how siteSettings() is handled.
 *
 * Fails open: if the query itself errors, every known slug is reported as
 * present. A broken database read should not strip the legal links off a site
 * whose pages are perfectly fine.
 */
const KNOWN_LEGAL_SLUGS = ["privacy-policy", "terms-conditions"];

export const existingLegalSlugs = cache(async function existingLegalSlugs() {
  try {
    const { data, error } = await supabase
      .from("pages")
      .select("slug")
      .in("slug", KNOWN_LEGAL_SLUGS);

    if (error) {
      console.error("legal pages lookup failed:", error.message);
      return new Set(KNOWN_LEGAL_SLUGS);
    }

    const found = new Set((data ?? []).map((row) => row.slug));

    const missing = KNOWN_LEGAL_SLUGS.filter((s) => !found.has(s));
    if (missing.length) {
      console.error(
        `[db-compat] Legal page rows missing: ${missing.join(", ")}. ` +
          `Their footer links are hidden so they do not 404. ` +
          `Run supabase/migrations/007_seed_legal_pages.sql, then edit the ` +
          `placeholder text from the dashboard.`,
      );
    }

    return found;
  } catch (err) {
    console.error("legal pages unreachable:", err?.message ?? err);
    return new Set(KNOWN_LEGAL_SLUGS);
  }
});
