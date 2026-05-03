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
      value: settings?.whatsapp,
    },
    {
      id: "phone",
      href: `tel:${settings?.phone}`,
      icon: FaPhone,
      labelAr: "جوال",
      labelEn: "Call",
      value: settings?.phone,
    },
    {
      id: "email",
      href: `mailto:${settings?.email}`,
      icon: FaEnvelope,
      labelAr: "بريد إلكتروني",
      labelEn: "Email",
      value: settings?.email,
    },
  ];

  return (
    <div className="lg:col-span-3 space-y-4">
      <ul className="flex flex-col gap-4">
        {contactMethods.map((method) => {
          if (!method.value) return null;
          const Icon = method.icon;

          return (
            <li key={method.id}>
              <Link
                href={method.href}
                aria-label="زر الاتصال"
                className="text-third hover:text-brand-orange flex items-center gap-2 hover:translate-x-[-8px] transition-all duration-300 font-medium group"
              >
                <Icon className="text:text hover:text-brand-orange group-hover:scale-110 transition-transform" />

                <span className="flex gap-2">
                  <span>
                    {locale === "ar" ? method.labelAr : method.labelEn}:
                  </span>
                  <span dir="ltr">{method.value}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
