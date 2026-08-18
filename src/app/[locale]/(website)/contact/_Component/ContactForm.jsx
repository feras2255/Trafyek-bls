"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { submitContactMessage } from "../actions";

const SERVICE_TYPES = [
  "website",
  "ecommerce",
  "mobile_app",
  "seo_ads",
  "ai_geo",
  "other",
];

const BUDGET_RANGES = ["under_5k", "5k_15k", "15k_50k", "over_50k"];

const EMPTY = {
  name: "",
  company: "",
  phone: "",
  email: "",
  serviceType: "",
  budgetRange: "",
  message: "",
};

const field =
  "w-full rounded-[10px] border border-border bg-card px-4 py-3.5 text-sm text-maintext outline-none transition-colors placeholder:text-subtext focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const locale = useLocale();

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [pending, setPending] = useState(false);
  const mountedAt = useRef(Date.now());
  const botField = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the person edits it, rather than making
    // them submit again to find out whether they fixed it.
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pending) return;

    setPending(true);
    setErrors({});

    try {
      const params =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search)
          : new URLSearchParams();

      const result = await submitContactMessage({
        ...form,
        locale,
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
        utmSource: params.get("utm_source") ?? "",
        utmMedium: params.get("utm_medium") ?? "",
        utmCampaign: params.get("utm_campaign") ?? "",
        botField: botField.current?.value ?? "",
        elapsedMs: Date.now() - mountedAt.current,
      });

      if (result?.ok) {
        toast.success(t("success_msg"));
        setForm(EMPTY);
        mountedAt.current = Date.now();
        return;
      }

      setErrors(result?.errors ?? {});
      toast.error(
        result?.errors?.form ? t("error_msg") : t("validation_msg"),
      );
    } catch {
      toast.error(t("error_msg"));
    } finally {
      setPending(false);
    }
  };

  const errorFor = (name) =>
    errors[name] ? (
      <p className="text-xs font-bold text-worning">{t(`errors.${name}`)}</p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {/* Not display:none — some bots skip hidden inputs. Off-screen and
          removed from the a11y tree instead. */}
      <input
        ref={botField}
        type="text"
        name="website_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] size-0 opacity-0"
      />

      <div className="flex flex-col gap-1.5">
        <input
          className={field}
          type="text"
          name="name"
          placeholder={t("placeholder_name")}
          value={form.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          required
        />
        {errorFor("name")}
      </div>

      <input
        className={field}
        type="text"
        name="company"
        placeholder={t("placeholder_company")}
        value={form.company}
        onChange={handleChange}
      />

      <div className="flex flex-col gap-1.5">
        <input
          className={field}
          type="tel"
          name="phone"
          inputMode="tel"
          placeholder={t("placeholder_phone")}
          value={form.phone}
          onChange={handleChange}
          aria-invalid={Boolean(errors.phone)}
          required
        />
        {errorFor("phone")}
      </div>

      <div className="flex flex-col gap-1.5">
        <input
          className={field}
          type="email"
          name="email"
          placeholder={t("placeholder_email")}
          value={form.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          required
        />
        {errorFor("email")}
      </div>

      <select
        className={field}
        name="serviceType"
        value={form.serviceType}
        onChange={handleChange}
        aria-label={t("service_label")}
      >
        <option value="">{t("service_label")}</option>
        {SERVICE_TYPES.map((key) => (
          <option key={key} value={key}>
            {t(`services.${key}`)}
          </option>
        ))}
      </select>

      <select
        className={field}
        name="budgetRange"
        value={form.budgetRange}
        onChange={handleChange}
        aria-label={t("budget_label")}
      >
        <option value="">{t("budget_label")}</option>
        {BUDGET_RANGES.map((key) => (
          <option key={key} value={key}>
            {t(`budgets.${key}`)}
          </option>
        ))}
      </select>

      <div className="flex flex-col gap-1.5">
        <textarea
          className={`${field} resize-none`}
          name="message"
          rows={4}
          placeholder={t("placeholder_message")}
          value={form.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          required
        />
        {errorFor("message")}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="rounded-[10px] bg-primary p-4 text-[15px] font-extrabold text-text transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? t("sending") : t("submit_button")}
      </button>
    </form>
  );
}
