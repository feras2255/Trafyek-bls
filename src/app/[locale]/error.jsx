"use client";

import { useEffect } from "react";

/**
 * Route-level error boundary.
 *
 * The project had none — verified with `find src/app -name "error.jsx"`, which
 * returned nothing. Any exception thrown while rendering a page therefore fell
 * through to Next's built-in screen, which in production is an unstyled
 * "Application error: a client-side exception has occurred". On a site whose
 * pages all read from a database over the network, the realistic trigger is
 * ordinary: Supabase slow, a dropped connection, a malformed CMS row.
 *
 * Deliberately dependency-free. It does not call useTranslations, because the
 * next-intl provider lives in the layout and an error boundary has to keep
 * working when the tree above it is the thing that failed. Locale comes from
 * the URL instead.
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // Surfaces in the hosting platform's logs, where it can actually be seen.
    console.error("Route error:", error);
  }, [error]);

  const isAr =
    typeof window === "undefined" ||
    !window.location.pathname.startsWith("/en");

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center"
    >
      <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-background-2 text-3xl">
        <span aria-hidden="true">⚠️</span>
      </div>

      <h1 className="mb-3 text-2xl font-black text-accent md:text-3xl">
        {isAr ? "حدث خطأ غير متوقع" : "Something went wrong"}
      </h1>

      <p className="mb-8 max-w-[460px] text-[15px] leading-[1.9] text-subtext">
        {isAr
          ? "تعذّر تحميل هذه الصفحة. جرّب مرة أخرى، وإن تكرر الأمر تواصل معنا مباشرة."
          : "We could not load this page. Please try again, and contact us directly if it keeps happening."}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="rounded-[10px] bg-primary px-8 py-3.5 text-base font-extrabold text-text transition-colors hover:bg-primary-dark"
        >
          {isAr ? "إعادة المحاولة" : "Try again"}
        </button>
        <a
          href={isAr ? "/ar" : "/en"}
          className="rounded-[10px] border border-border px-8 py-3.5 text-base font-extrabold text-accent"
        >
          {isAr ? "العودة للرئيسية" : "Back to home"}
        </a>
        <a
          href={isAr ? "/ar/contact" : "/en/contact"}
          className="rounded-[10px] border border-border px-8 py-3.5 text-base font-extrabold text-accent"
        >
          {isAr ? "تواصل معنا" : "Contact us"}
        </a>
      </div>
    </div>
  );
}
