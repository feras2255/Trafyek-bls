"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import { useSiteSettings } from "@/app/context/SiteSettingsContext";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const settings = useSiteSettings();

  const pathname = usePathname();
  const transparentPages = ["/", "/projects", "/contact"];
  const isTransparent = transparentPages.includes(pathname);

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!settings) return null;
  return (
    <header
      className={`fixed left-0 right-0 py-2 md:py-1 z-40 transition-all duration-300 shadow-md 
     ${
       isTransparent
         ? scrolled
           ? "top-0 bg-fourth"
           : "top-1 bg-transparent"
         : "top-0 bg-fourth"
     }`}
    >
      <div className="container mx-auto px-4 py-2 md:py-3 flex items-center justify-between">
        <div className="flex-1 flex items-center gap-x-0 md:gap-x-20 lg:gap-x-56 ">
          <Link
            href="/"
            className="relative order-2 md:order-1 w-28 h-8 md:w-24 md:h-12 lg:w-32 lg:h-14"
          >
            <Image
              src="/logo.png"
              alt="logo"
              fill
              className="object-contain"
              priority
            />
          </Link>

          <Navbar settings={settings.settings.image_url || "/logo.png"} />
        </div>
        <Link
          href={`tel:${settings.settings.phone_number} || "201208651583"`}
          className="order-3 text-sm md:text-lg text-maintext bg-third px-4 py-2 rounded-lg"
        >
          تواصل معنا
        </Link>
      </div>
    </header>
  );
}
