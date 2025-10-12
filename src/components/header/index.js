"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Image from "next/image";
import { useSiteSettings } from "@/app/context/SiteSettingsContext";
import Link from "next/link";

export default function Header() {
  const settings = useSiteSettings();

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
      className={`fixed top-0 left-0 right-0 py-1 z-40 transition-all duration-300 shadow-md ${
        scrolled ? "bg-input" : "bg-input"
      }`}
    >
      <div className="container mx-auto px-4 py-2 md:py-3 flex items-center justify-between">
        <Navbar settings={settings.settings.image_url} />
        <Link
          href="/"
          className="relative w-28 h-8 md:w-24 md:h-12 lg:w-32 lg:h-14"
        >
          <Image
            src={settings.settings.image_url}
            alt="logo"
            fill
            className="object-contain"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
