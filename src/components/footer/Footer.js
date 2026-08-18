import { Link } from "@/i18n/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { siteSettings } from "@/lib/siteSettings";
import { existingLegalSlugs } from "@/lib/legalPages";
import SocialLinks from "./SocialLinks";
import PaymentIcons from "./PaymentIcons";
import ContactButtons from "./ContactButtons";

export default async function Footer() {
  const t = await getTranslations("infoSite");
  const locale = await getLocale();
  const isRtl = locale === "ar";
  const settings = await siteSettings();

  // The legal pages come from the database (migration 007 seeds them), and
  // this footer renders on every page. Linking to a row that does not exist
  // would put a sitewide 404 in front of visitors and crawlers alike, so a
  // legal link is shown only once its row is really there. Fails open — if the
  // lookup itself errors, both links are kept.
  const legalSlugs = await existingLegalSlugs();

  // The footer holds the legal links, so it must render even if the settings
  // read fails; the settings-driven blocks below are individually guarded.
  const quickLinks = [
    { id: "f-1", title: t("about"), href: "/about-us" },
    { id: "f-2", title: t("services"), href: "/services" },
    { id: "f-3", title: t("ourwork"), href: "/ourwork" },
    legalSlugs.has("privacy-policy") && {
      id: "f-4",
      title: t("privacy"),
      href: "/pages/privacy-policy",
    },
    legalSlugs.has("terms-conditions") && {
      id: "f-5",
      title: t("terms"),
      href: "/pages/terms-conditions",
    },
  ].filter(Boolean);

  const description = isRtl
    ? settings?.description_ar || settings?.description
    : settings?.description_en || settings?.description;

  const columnLabel =
    "text-sm font-extrabold uppercase tracking-[0.08em] text-text";

  return (
    <footer className="bg-ink px-6 pt-16 pb-8 text-text">
      <div className="mx-auto grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-10 border-b border-white/10 pb-10">
        {/* brand */}
        <div className="flex flex-col gap-3.5">
          <div className="text-[22px] font-black">
            ترافيك <span className="text-brand-orange">بلس</span>
          </div>
          <p className="m-0 max-w-[300px] text-sm leading-[1.8] text-third">
            {description || t("tagline")}
          </p>
        </div>

        {/* quick links */}
        <div className="flex flex-col gap-3.5">
          <div className={columnLabel}>{t("quickLinks")}</div>
          {quickLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-sm text-third transition-colors hover:text-brand-orange"
            >
              {link.title}
            </Link>
          ))}
        </div>

        {/* contact channels — kept from the previous footer so the phone,
            email and WhatsApp values stay reachable, not just a CTA */}
        <div className="flex flex-col gap-3.5">
          <div className={columnLabel}>{t("contact")}</div>
          {settings ? (
            <ContactButtons settings={settings} locale={locale} />
          ) : (
            <Link
              href="/contact"
              className="w-fit rounded-[10px] bg-primary px-[22px] py-3 text-sm font-extrabold text-text transition-colors hover:bg-primary-dark"
            >
              {t("contact")}
            </Link>
          )}
        </div>

        {/* social — kept from the previous footer; the design omitted it */}
        {settings ? (
          <div className="flex flex-col gap-3.5">
            <div className={columnLabel}>{t("followUs")}</div>
            <SocialLinks links={settings} />
          </div>
        ) : null}
      </div>

      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 pt-6 md:flex-row">
        <PaymentIcons />
        <div className="text-center text-[13px] text-muted">
          &copy; {new Date().getFullYear()} {t("siteName")}. {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
