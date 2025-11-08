"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar({ settings }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { id: crypto.randomUUID(), title: "الرئيسية", href: "/" },
    { id: crypto.randomUUID(), title: "عن الشركة", href: "/about" },
    { id: crypto.randomUUID(), title: "خدماتنا", href: "/services" },
    { id: crypto.randomUUID(), title: "مشاريعنا", href: "/projects" },
    { id: crypto.randomUUID(), title: "اتصل بنا", href: "/contact" },
  ];

  return (
    <nav className="relative order-1 md:order-2">
      <ul className="hidden md:flex gap-6 text-maintext text-base lg:text-xl font-bold px-4 py-2 border border-border rounded-full">
        {links.map((link) => (
          <li key={link.id}>
            <Link href={link.href}>{link.title}</Link>
          </li>
        ))}
      </ul>

      {/* menu icon */}
      <button
        className="md:hidden text-maintext cursor-pointer"
        onClick={() => setIsOpen(true)}
        aria-label="فتح القائمة"
      >
        <Menu size={28} />
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-fourth transform transition-transform duration-300 z-50 ${
          isOpen ? "-translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* close icon */}
        <button
          className="absolute top-4 right-4 text-maintext"
          onClick={() => setIsOpen(false)}
        >
          <X size={28} />
        </button>
        <div className="flex items-center justify-center mt-10">
          <Image src={settings} alt="logo" width={150} height={80} />
        </div>

        <ul className="flex flex-col gap-6 mt-8 px-6 text-maintext text-lg font-semibold">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-accent transition-colors"
              >
                {link.title}
              </Link>
              <div className="mt-2 border-t border-ring"></div>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
