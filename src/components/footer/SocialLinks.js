import { Link } from "@/i18n/navigation";
import { FaSnapchatGhost, FaTiktok, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialLinks({ links }) {
  // تعريف مصفوفة الروابط لتجنب تكرار كود الـ JSX
  const socialMedia = [
    {
      id: "snapchat",
      href: links?.snapchat,
      icon: FaSnapchatGhost,
      label: "تابعنا على سناب شات",
      colorClass: "text-maintext",
    },
    {
      id: "tiktok",
      href: links?.tiktok,
      icon: FaTiktok,
      label: "تابعنا على تيك توك",
      colorClass: "text-maintext",
    },
    {
      id: "instagram",
      href: links?.instagram,
      icon: FaInstagram,
      label: "تابعنا على انستاجرام",
      colorClass: "text-maintext",
    },
    {
      id: "x",
      href: links?.x_account,
      icon: FaXTwitter,
      label: "تابعنا على منصة X",
      colorClass: "text-maintext",
    },
  ];

  return (
    <div className="flex justify-start gap-x-3 mt-3">
      {socialMedia.map((social) => {
        if (!social.href) return null;

        const Icon = social.icon;

        return (
          <Link
            key={social.id}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="p-3 bg-background hover:bg-card rounded-full transition-colors duration-500 ease-in-out flex items-center justify-center"
          >
            <Icon className={`${social.colorClass} size-4 md:size-5`} />
          </Link>
        );
      })}
    </div>
  );
}
