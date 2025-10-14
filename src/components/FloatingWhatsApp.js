"use client";

import WhatsAppIcon from "./icons/WhatsAppIcon";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/996530446151"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="fixed bottom-6 right-6 w-14 h-14 p-1 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-all duration-300 z-50 animate-bounce hover:scale-110"
    >
      <WhatsAppIcon size={36} />
    </a>
  );
}
