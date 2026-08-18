"use server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { isMissingColumn, warnMigrationMissing } from "@/lib/dbCompat";

/**
 * Lead submission moved off the browser.
 *
 * The form previously inserted straight into contact_messages from the client
 * with the public anon key, which meant the table had to accept anon writes and
 * nothing validated the payload. This runs on the server, validates every
 * field, and writes with the service role — so RLS can now deny anon INSERT on
 * contact_messages entirely.
 *
 * Requires migration 001 (company, service_type, budget_range, status, source
 * columns). Run it before deploying, or the insert fails on unknown columns.
 */

// Stored as stable keys rather than the Arabic labels the form displays, so a
// lead submitted from /en and one from /ar are the same value in reports.
const SERVICE_TYPES = [
  "website",
  "ecommerce",
  "mobile_app",
  "seo_ads",
  "ai_geo",
  "other",
];

const BUDGET_RANGES = ["under_5k", "5k_15k", "15k_50k", "over_50k"];

const LIMITS = {
  name: 100,
  company: 150,
  email: 200,
  phone: 30,
  message: 5000,
};

// Deliberately permissive: this rejects obvious non-addresses without
// bouncing the unusual-but-valid ones a stricter pattern would refuse.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validate(payload) {
  const errors = {};

  const name = clean(payload.name, LIMITS.name);
  if (name.length < 2) errors.name = "required";

  const email = clean(payload.email, LIMITS.email);
  if (!EMAIL_RE.test(email)) errors.email = "invalid";

  // Digits only after stripping the usual separators, so "+966 53 044 6151"
  // and "0530446151" both pass while free text does not.
  const phone = clean(payload.phone, LIMITS.phone);
  const phoneDigits = phone.replace(/[\s()+-]/g, "");
  if (!/^\d{8,15}$/.test(phoneDigits)) errors.phone = "invalid";

  const message = clean(payload.message, LIMITS.message);
  if (message.length < 10) errors.message = "too_short";

  const company = clean(payload.company, LIMITS.company);

  const serviceType = clean(payload.serviceType, 40);
  if (serviceType && !SERVICE_TYPES.includes(serviceType)) {
    errors.serviceType = "invalid";
  }

  const budgetRange = clean(payload.budgetRange, 40);
  if (budgetRange && !BUDGET_RANGES.includes(budgetRange)) {
    errors.budgetRange = "invalid";
  }

  return {
    errors,
    values: {
      name,
      email,
      phone,
      message,
      company: company || null,
      service_type: serviceType || null,
      budget_range: budgetRange || null,
    },
  };
}

export async function submitContactMessage(payload) {
  // Bot traps: a field no human sees, and a form that came back impossibly
  // fast. Neither replaces rate limiting — see the note at the end of this file.
  if (clean(payload?.botField, 100)) {
    return { ok: true, skipped: true };
  }
  const elapsed = Number(payload?.elapsedMs);
  if (Number.isFinite(elapsed) && elapsed > 0 && elapsed < 1500) {
    return { ok: true, skipped: true };
  }

  const { errors, values } = validate(payload ?? {});
  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  const meta = {
    status: "new",
    locale: clean(payload.locale, 5) || null,
    source_page: clean(payload.sourcePage, 200) || null,
    utm_source: clean(payload.utmSource, 100) || null,
    utm_medium: clean(payload.utmMedium, 100) || null,
    utm_campaign: clean(payload.utmCampaign, 100) || null,
  };

  const { error } = await supabaseAdmin
    .from("contact_messages")
    .insert([{ ...values, ...meta }]);

  if (!error) return { ok: true };

  // ── Migration 001 has not been applied yet ───────────────────────────────
  //
  // The migrations are run by a human, not by the app, so there is a window
  // between deploying this code and applying 001 where none of the columns
  // below exist: company, service_type, budget_range, status, locale,
  // source_page, utm_source, utm_medium, utm_campaign.
  //
  // Before this branch existed, that window meant every submission failed and
  // the lead was gone — the visitor saw an error and left. Losing a paying
  // customer because a SQL file had not been run yet is not an acceptable
  // failure mode for the form that is the site's only conversion point.
  //
  // So: retry with the four columns the table has always had, and fold
  // everything that would otherwise be dropped into the message body. The
  // lead is captured either way; whoever reads it still sees the company,
  // the service and the budget. Nothing is invented and nothing is discarded.
  if (isMissingColumn(error)) {
    warnMigrationMissing("001_contact_messages_lead_fields.sql", error.message);

    const extras = [
      values.company && `الشركة/النشاط: ${values.company}`,
      values.service_type && `نوع الخدمة: ${values.service_type}`,
      values.budget_range && `الميزانية: ${values.budget_range}`,
      meta.locale && `اللغة: ${meta.locale}`,
      meta.source_page && `الصفحة: ${meta.source_page}`,
      meta.utm_source && `utm_source: ${meta.utm_source}`,
      meta.utm_medium && `utm_medium: ${meta.utm_medium}`,
      meta.utm_campaign && `utm_campaign: ${meta.utm_campaign}`,
    ].filter(Boolean);

    const message = extras.length
      ? `${values.message}\n\n— — —\n${extras.join("\n")}`
      : values.message;

    const retry = await supabaseAdmin.from("contact_messages").insert([
      {
        name: values.name,
        email: values.email,
        phone: values.phone,
        message,
      },
    ]);

    if (!retry.error) return { ok: true, degraded: true };

    console.error(
      "contact_messages fallback insert failed:",
      retry.error.message,
    );
    return { ok: false, errors: { form: "server" } };
  }

  // Logged server-side only. The caller gets a generic failure so a database
  // error never describes the schema to whoever is probing the form.
  console.error("contact_messages insert failed:", error.message);
  return { ok: false, errors: { form: "server" } };
}

export { SERVICE_TYPES, BUDGET_RANGES };

// STILL MISSING, and it needs a decision rather than a default:
//   1. Notification on arrival (audit finding BIZ-02). A lead currently lands
//      in the table and waits for someone to open the dashboard. This is the
//      right place to send it — tell me the channel (email / WhatsApp) and I
//      will wire it here.
//   2. Real rate limiting. The traps above stop naive bots, not a determined
//      one. Doing it properly needs a shared counter (Upstash, or a Postgres
//      table keyed by IP), which is infrastructure I should not pick for you.
