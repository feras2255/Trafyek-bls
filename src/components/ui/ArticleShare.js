"use client";

import Link from "next/link";
import {
  FaWhatsapp,
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaLink,
} from "react-icons/fa6";
import { useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";

export default function ArticleShare({ title, slug }) {
  const [copied, setCopied] = useState(false);

  const articleUrl = `https://www.daraltebyan.com/blog/${slug}`;

  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(articleUrl);

  const socialLinks = [
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <FaWhatsapp size={18} />,
      className: "bg-green-500 hover:bg-green-600 hover:-translate-y-1",
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FaFacebookF size={18} />,
      className: "bg-blue-600 hover:bg-blue-700 hover:-translate-y-1",
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: <FaXTwitter size={18} />,
      className: "bg-black hover:bg-neutral-800 hover:-translate-y-1",
    },
    {
      name: "Telegram",
      href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <FaTelegramPlane size={18} />,
      className: "bg-sky-500 hover:bg-sky-600 hover:-translate-y-1",
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <FaLinkedinIn size={18} />,
      className: "bg-blue-700 hover:bg-blue-800 hover:-translate-y-1",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: articleUrl,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="my-20 p-6 md:p-8 bg-linear-to-r from-primary to-accent rounded-4xl border border-sand/10 text-center">
      <h3 className="text-2xl md:text-3xl font-black text-brand-orange mb-4">
        هل أعجبك المقال؟
      </h3>

      <p className="text-text mb-8 text-sm md:text-base leading-8">
        ساهم في نشر العلم بمشاركة المقال مع أصدقائك عبر وسائل التواصل الاجتماعي.
      </p>

      <div className="flex flex-wrap justify-center gap-3">
        {socialLinks.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className={`size-12 rounded-full text-white flex items-center justify-center transition-all duration-300 shadow-lg ${item.className}`}
          >
            {item.icon}
          </Link>
        ))}

        {/* copy link */}
        <button
          onClick={handleCopy}
          className="size-12 rounded-full bg-primary text-white flex items-center justify-center transition-all duration-300 hover:bg-primary/90 hover:-translate-y-1 shadow-lg"
          aria-label="نسخ الرابط"
          title="نسخ الرابط"
        >
          <FaLink size={18} />
        </button>

        {/* native share */}
        {typeof navigator !== "undefined" &&
          typeof navigator.share === "function" && (
            <button
              onClick={handleNativeShare}
              className="px-5 h-12 rounded-full bg-brand-orange text-white font-bold transition-all hover:-translate-y-1 cursor-pointer"
            >
              مشاركة
            </button>
          )}
      </div>

      {copied && (
        <p className="mt-5 text-sm text-green-600 font-bold">
          تم نسخ رابط المقال بنجاح
        </p>
      )}
    </div>
  );
}
