import { FaWhatsapp, FaPhone, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

export default function ContactButtons({ settings, locale }) {
  const contactMethods = [
    {
      id: "whatsapp",
      href: `https://wa.me/${settings?.whatsapp}`,
      icon: FaWhatsapp,
      labelAr: "واتساب",
      labelEn: "WhatsApp",
    },
    {
      id: "phone",
      href: `tel:${settings?.phone}`,
      icon: FaPhone,
      labelAr: "جوال",
      labelEn: "Call",
    },
    {
      id: "email",
      href: `mailto:${settings?.email}`,
      icon: FaEnvelope,
      labelAr: "بريد",
      labelEn: "Email",
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 text-sm mt-2">
      {contactMethods.map((method) => {
        const value =
          settings?.[
            method.id === "phone"
              ? "phone"
              : method.id === "whatsapp"
                ? "whatsapp"
                : "email"
          ];
        if (!value) return null;

        const Icon = method.icon;

        return (
          <Link
            key={method.id}
            href={method.href}
            className="flex items-center gap-1 border border-border rounded-md py-1 px-3 hover:text-border/50 hover:border-border/50 transition duration-300"
          >
            <Icon />
            {locale === "ar" ? method.labelAr : method.labelEn}
          </Link>
        );
      })}
    </div>
  );
}
