import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";

/**
 * The site had no custom 404. Next.js served its bare default, which offers a
 * dead end with no navigation — a wasted recovery point for anyone landing on
 * a stale link, and no route back for a crawler either.
 */
export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations("notFound");
  const isAr = locale === "ar";

  const links = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/ourwork", label: t("ourwork") },
    { href: "/blogs", label: t("blog") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <main
      className="flex min-h-[70vh] items-center justify-center px-6 py-24"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-[640px] text-center">
        <p className="font-mono-display text-[64px] leading-none font-bold text-primary/30">
          404
        </p>
        <h1 className="mt-4 mb-3 text-3xl font-black text-accent md:text-4xl">
          {t("title")}
        </h1>
        <p className="mx-auto mb-8 max-w-[520px] text-[17px] leading-[1.8] text-subtext">
          {t("description")}
        </p>

        <nav className="flex flex-wrap items-center justify-center gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-[10px] border border-border bg-card px-5 py-2.5 text-sm font-bold text-accent transition-colors hover:border-primary hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
