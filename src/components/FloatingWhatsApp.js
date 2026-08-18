import { FaWhatsapp } from "react-icons/fa";
import { getTranslations } from "next-intl/server";
import { siteSettings } from "@/lib/siteSettings";

/**
 * The approved design replaces the previous expanding contact FAB with a
 * single WhatsApp button pinned bottom-left. The phone number it used to
 * offer is still reachable from the footer and the contact page.
 *
 * Reads the number from site_settings instead of the hardcoded literal the
 * old version carried, so changing it in the dashboard now takes effect.
 */
export default async function FloatingWhatsApp() {
  const t = await getTranslations("infoSite");
  const settings = await siteSettings();

  if (!settings?.whatsapp) return null;

  return (
    <a
      href={`https://wa.me/${settings.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("whatsapp")}
      className="fixed bottom-6 left-6 z-50 flex size-[58px] items-center justify-center rounded-full bg-whatsapp text-text shadow-[0_15px_30px_-10px_rgba(0,0,0,0.35)] transition-transform hover:scale-110 active:scale-95"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}
