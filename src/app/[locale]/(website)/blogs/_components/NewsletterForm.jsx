"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { subscribeToNewsletter } from "../actions";

export default function NewsletterForm() {
  const t = useTranslations("blog.newsletter");
  const locale = useLocale();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const botField = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pending) return;
    setPending(true);

    try {
      const result = await subscribeToNewsletter({
        email,
        locale,
        sourcePage:
          typeof window !== "undefined" ? window.location.pathname : "",
        botField: botField.current?.value ?? "",
      });

      if (result?.ok) {
        toast.success(t("success"));
        setEmail("");
      } else {
        toast.error(result?.error === "invalid" ? t("invalid") : t("error"));
      }
    } catch {
      toast.error(t("error"));
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto flex max-w-[460px] flex-wrap gap-2.5"
    >
      <input
        ref={botField}
        type="text"
        name="company_url"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] size-0 opacity-0"
      />

      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("placeholder")}
        aria-label={t("placeholder")}
        className="flex-[1_1_220px] rounded-[10px] border border-border bg-card px-4 py-3.5 text-sm text-maintext outline-none transition-colors placeholder:text-subtext focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded-[10px] bg-primary px-7 py-3.5 text-[15px] font-extrabold text-text transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? t("sending") : t("button")}
      </button>
    </form>
  );
}
