"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PaymentIcons from "./PaymentIcons";
import ContactLinks from "./ContactLinks";
import SocialLinks from "./SocialLinks";
import { useSiteSettings } from "@/app/context/SiteSettingsContext";

const links = [
  { id: 2, title: "عن الشركة", href: "/about" },
  { id: 6, title: "اتصل بنا", href: "/contact" },
  { id: 3, title: "سياسة الخصوصية", href: "/privacy-policy" },
  { id: 1, title: "الشروط والاحكام", href: "/terms-conditions" },
];
export default function Footer() {
  const settings = useSiteSettings();
  if (!settings) return null;
  return (
    <footer className="bg-fourth text-maintext ">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <div>
              <Image
                src={settings.settings.image_url}
                alt="logo"
                width={160}
                height={60}
                className="mx-auto"
              />
            </div>
            <p className="mt-4 text-justify">{settings.settings.description}</p>
          </div>
          {/* quick links */}
          <div className="mt-2">
            <h3 className="text-2xl font-bold ">روابط سريعة</h3>
            <ul className="mt-6 grid grid-cols-2 gap-y-3 gap-x-6">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-base md:text-md font-semibold text-maintext hover:text-ring transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact us */}
          <div className="mt-2">
            <h3 className="text-2xl font-bold">تواصل معنا</h3>
            <ContactLinks links={settings.settings} />
            <SocialLinks links={settings.settings} />
          </div>
          {/* saudia business center */}
          <div>
            <div className="w-1/2 flex mx-auto md:mt-20 bg-maintext rounded-2xl">
              <Image
                src="/saudia.webp"
                alt="logo"
                width={400}
                height={80}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
        {/* copyright */}
        <div className="mt-8 pt-8 border-t border-ring flex flex-col md:flex-row gap-y-4 items-center justify-between ">
          <PaymentIcons />
          <div className="mt-4 text-center text-sm text-card">
            <p>
              جميع الحقوق محفوظة &copy; {new Date().getFullYear()} ترافيك بلس
            </p>
            <p>
              تم التطوير بواسطة{" "}
              <a
                href="https://wa.me/201208651583"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="تواصل معنا عبر واتساب"
                className="text-border underline hover:text-ring/80 transition-colors"
              >
                Abdelrahman
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
