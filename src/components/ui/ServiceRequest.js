import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { FaWhatsapp, FaPhoneAlt, FaChartLine } from "react-icons/fa";

export default async function ServiceRequest() {
  const t = await getTranslations("serviceRequest");
  const phoneNumber = "966530446151";

  return (
    <section className="relative overflow-hidden py-32 px-4 lg:px-6 bg-[#fafafa]">
      {/* Dynamic Brand Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-secondary/20 blur-[150px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">
        <div className="flex flex-col items-center text-center space-y-10">
          {/* Status Badge */}
          <div className="flex items-center gap-3 bg-white border border-border px-5 py-2.5 rounded-2xl shadow-sm group">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-accent font-black text-xs md:text-sm tracking-wide uppercase">
              {t("statusBadge")}
            </span>
          </div>

          {/* Main Hero Text */}
          <div className="space-y-6 max-w-5xl">
            <h2 className="text-5xl md:text-8xl font-black text-accent leading-tight tracking-tight">
              {t.rich("heroTitle", {
                br: () => <br />,
                primary: (chunks) => (
                  <span className="text-primary italic inline-block mx-1">
                    {chunks}
                  </span>
                ),
                underlined: (chunks) => (
                  <span className="relative inline-block">
                    {chunks}
                    <svg
                      className="absolute -bottom-2 md:-bottom-4 left-0 w-full"
                      viewBox="0 0 338 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M3 9C118.5 3 226.5 3 335 9"
                        stroke="#7B3F98"
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                ),
              })}
            </h2>

            <p className="text-subtext text-xl md:text-3xl max-w-3xl mx-auto font-medium leading-relaxed">
              {t.rich("description", {
                accent: (chunks) => (
                  <span className="text-accent font-black">{chunks}</span>
                ),
              })}
            </p>

            <div className="inline-flex items-center gap-3 bg-secondary/10 px-6 py-3 rounded-2xl text-primary">
              <FaChartLine className="text-2xl" />
              <span className="font-black text-lg md:text-2xl">
                {t("planText")}
              </span>
            </div>
          </div>

          {/* Conversion Area */}
          <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center pt-6">
            <Link
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(t("whatsappMessage"))}`}
              target="_blank"
              aria-label="تواصل معنا"
              className="flex items-center justify-center gap-4 w-full md:w-[350px] bg-primary text-white px-10 py-6 rounded-[2.5rem] shadow-2xl hover:bg-accent transition-all duration-500 font-black text-2xl group"
            >
              <span>{t("ctaStart")}</span>
              <FaWhatsapp className="text-3xl group-hover:rotate-12 transition-transform" />
            </Link>

            <Link
              href={`tel:+${phoneNumber}`}
              aria-label="اتصل بنا"
              className="flex items-center justify-center gap-4 w-full md:w-[300px] bg-transparent text-accent border-2 border-accent/20 px-10 py-6 rounded-[2.5rem] hover:bg-white hover:border-primary transition-all duration-500 font-black text-2xl"
            >
              <span>{t("ctaCall")}</span>
              <FaPhoneAlt size={22} />
            </Link>
          </div>

          {/* Social Proof */}
          <div className="pt-6">
            <p className="text-subtext/60 font-black text-sm uppercase tracking-[0.3em]">
              {t("socialProof")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
