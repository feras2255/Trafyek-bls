"use client";

/**
 * Last-resort boundary: catches failures in the root layout itself, which
 * [locale]/error.jsx cannot, because that boundary lives inside the tree the
 * layout renders.
 *
 * It must supply its own <html> and <body>, since the layout that normally
 * provides them is precisely what failed. No fonts, no providers, no Tailwind
 * classes — inline styles only, so it renders even if the stylesheet was part
 * of the failure. Arabic-first, matching the site's default locale.
 */
export default function GlobalError({ error, reset }) {
  console.error("Root layout error:", error);

  return (
    <html lang="ar" dir="rtl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          padding: "2rem",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          background: "#ffffff",
          color: "#003066",
        }}
      >
        <h1 style={{ fontSize: "1.6rem", fontWeight: 800, margin: 0 }}>
          حدث خطأ غير متوقع
        </h1>
        <p style={{ color: "#5a5c60", maxWidth: 420, lineHeight: 1.9 }}>
          تعذّر تحميل الموقع حالياً. جرّب إعادة المحاولة بعد لحظات.
        </p>
        <button
          onClick={reset}
          style={{
            border: 0,
            borderRadius: 10,
            padding: "0.9rem 2rem",
            fontSize: "1rem",
            fontWeight: 800,
            color: "#ffffff",
            background: "#7b3f98",
            cursor: "pointer",
          }}
        >
          إعادة المحاولة
        </button>
      </body>
    </html>
  );
}
