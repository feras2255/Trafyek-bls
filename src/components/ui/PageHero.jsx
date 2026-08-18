"use client";
import Link from "next/link";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiMessageCircle,
  FiArrowDown,
} from "react-icons/fi";

export default function PageHero({
  whatsapp,
  title,
  description,
  breadcrumbData = [],
  isAr,
  showButtons = false,
  scrollToId = "content",
}) {
  // functions scroll to dwon
  const handleScroll = () => {
    const element = document.getElementById(scrollToId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full h-[calc(100vh-64px)] min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-accent to-slate-900 text-white">
      {/* Background Circles */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute -top-20 -right-20 size-[500px] bg-primary rounded-full blur-[150px]" />
        <div className="absolute -bottom-20 -left-20 size-[500px] bg-primary rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 md:px-4 relative z-10 flex flex-col items-center text-center">
        {/* Breadcrumb */}
        {breadcrumbData.length > 0 && (
          <nav className="flex items-center gap-2 mb-8 text-sm font-semibold text-white/60 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 animate-fade-in-up">
            <Link
              href="/"
              aria-label="الرئيسية"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <FiHome className="text-base" />
              <span className="hidden md:inline-block">
                {isAr ? "الرئيسية" : "Home"}
              </span>
            </Link>

            {breadcrumbData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {isAr ? (
                  <FiChevronLeft className="text-xs opacity-50" />
                ) : (
                  <FiChevronRight className="text-xs opacity-50" />
                )}
                {item.href ? (
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className="hover:text-text transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-[8px] text-text font-black">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </nav>
        )}

        {/* main title */}
        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight leading-tight animate-fade-in-up">
          <span className="bg-linear-to-r from-primary via-white to-primary bg-clip-text text-transparent">
            {title}
          </span>
        </h1>

        {/* description */}
        {description && (
          <p className="text-lg md:text-xl font-medium text-slate-300 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
            {description}
          </p>
        )}

        {/* buttons */}
        {showButtons && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up animation-delay-500">
            {/* contact button */}
            <Link
              href={whatsapp ? `https://wa.me/${whatsapp}` : "/contact"}
              aria-label="تواصل معنا"
              className="group flex items-center justify-center gap-2 w-full md:w-auto bg-primary hover:bg-white text-white hover:text-primary px-8 py-4 rounded-full font-black text-lg transition-all duration-300 shadow-xl shadow-primary/20"
            >
              <FiMessageCircle className="text-xl group-hover:rotate-12 transition-transform" />
              {isAr ? "تواصل معنا" : "Contact Us"}
            </Link>

            {/* down button */}
            <button
              onClick={handleScroll}
              aria-label="اكتشف المزيد"
              className="group flex items-center justify-center gap-2 w-full md:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 cursor-pointer"
            >
              {isAr ? "اكتشف المزيد" : "Explore More"}
              <FiArrowDown className="text-xl group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        )}

        {/* down arrow */}
        {!showButtons && (
          <div className="absolute bottom-10 animate-bounce opacity-30">
            <div className="w-0.5 h-10 bg-linear-to-b from-primary to-transparent"></div>
          </div>
        )}
      </div>
    </section>
  );
}
