import { cache } from "react";
import { supabase } from "@/lib/supabaseClient";

/**
 * Site settings, deduplicated per request.
 *
 * The header, the footer, the floating WhatsApp button and most pages each
 * called this independently, so a single page render issued three or four
 * identical queries for the same row. A smoke test over 20 routes produced 66
 * calls. React's cache() collapses them to one per request without any caller
 * needing to change.
 */
export const siteSettings = cache(async function siteSettings() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching settings:", error.message);
    return null;
  }

  return data;
});
