"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

/**
 * Newsletter subscription for the blog page's subscribe block.
 *
 * Requires migration 002 (newsletter_subscribers). That table has RLS on with
 * no anon policy on purpose — the subscriber list must never be readable or
 * writable from the browser — so this runs server-side with the service role.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export async function subscribeToNewsletter(payload) {
  const email = String(payload?.email ?? "")
    .trim()
    .slice(0, 200);

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "invalid" };
  }

  // Bot trap: a field no human sees.
  if (String(payload?.botField ?? "").trim()) {
    return { ok: true };
  }

  const { error } = await supabaseAdmin.from("newsletter_subscribers").insert([
    {
      email,
      locale: String(payload?.locale ?? "").slice(0, 5) || null,
      source_page: String(payload?.sourcePage ?? "").slice(0, 200) || null,
    },
  ]);

  if (error) {
    // 23505 = unique violation. Already subscribed is a success from the
    // visitor's point of view, and saying "you're already on the list" would
    // leak whether an address is in the database.
    if (error.code === "23505") return { ok: true };

    console.error("newsletter insert failed:", error.message);
    return { ok: false, error: "server" };
  }

  return { ok: true };
}
