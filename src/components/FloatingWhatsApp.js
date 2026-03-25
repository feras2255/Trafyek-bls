"use client";
import { useState } from "react";
import { FaWhatsapp, FaPhoneAlt, FaCommentDots } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "966530446151";

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div
      className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-4"
      dir="ltr"
    >
      {/* Contact Options Container */}
      <div
        className={`flex flex-col gap-4 mb-2 transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-10 scale-0 pointer-events-none"
        }`}
      >
        {/* WhatsApp Option */}
        <a
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-end gap-3 group relative" // أضفنا relative هنا
        >
          {/* <span className="absolute right-16 bg-primary text-text px-3 py-2 rounded-xl shadow-lg text-xs md:text-sm font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border pointer-events-none">
            واتساب
          </span> */}
          <div className="size-14 bg-[#25D366] text-text rounded-[1.2rem] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform shrink-0">
            <FaWhatsapp size={30} />
          </div>
        </a>

        {/* Phone Call Option */}
        <a
          href={`tel:+${phoneNumber}`}
          className="flex items-center justify-end gap-3 group"
        >
          {/* <span className="bg-primary text-text px-3 py-2 rounded-xl shadow-lg text-xs md:text-sm font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
            اتصال هاتفي
          </span> */}
          <div className="size-14 bg-primary text-text rounded-[1.2rem] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform border border-white/20">
            <FaPhoneAlt size={24} />
          </div>
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={toggleMenu}
        aria-label="خيارات التواصل"
        className={`size-14 md:size-16 rounded-2xl md:rounded-3xl flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95 z-50 cursor-pointer ${
          isOpen
            ? "bg-accent text-text rotate-180"
            : "bg-primary text-text shadow-primary/40 animate-bounce-slow"
        }`}
      >
        {isOpen ? <IoClose size={38} /> : <FaCommentDots size={32} />}
      </button>
    </div>
  );
}
