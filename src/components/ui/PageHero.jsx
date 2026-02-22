import Link from "next/link";
import { useLocale } from "next-intl";
import { FiChevronLeft, FiChevronRight, FiHome } from "react-icons/fi";

export default function PageHero({ title, description, breadcrumb, bgImage }) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <section
      className="relative h-[calc(100vh-60px)] py-32 bg-slate-900 overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      {bgImage && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 mb-10 text-sm font-bold text-white/70 bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-full">
            <Link
              href="/"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <FiHome className="text-base" />
            </Link>
            {breadcrumb &&
              breadcrumb.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {isRtl ? (
                    <FiChevronLeft className="text-xs" />
                  ) : (
                    <FiChevronRight className="text-xs" />
                  )}
                  <span
                    className={
                      item.href ? "hover:text-white" : "text-white font-black"
                    }
                  >
                    {item.label}
                  </span>
                </div>
              ))}
          </nav>

          <h1 className="text-2xl lg:text-7xl font-semibold text-text mb-5 tracking-tighter leading-tight">
            {title}
          </h1>

          {description && (
            <p className="text-sm md:text-xl text-secondary leading-relaxed max-w-3xl font-medium">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
