import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  FaShieldAlt,
  FaCode,
  FaServer,
  FaLock,
  FaChartLine,
  FaNetworkWired,
} from "react-icons/fa";

export default async function ServiceRequest() {
  const t = await getTranslations("serviceRequest");
  const phoneNumber = "966530446151";

  const features = [
    {
      id: 1,
      title: t("features.nda.title"),
      desc: t("features.nda.desc"),
      icon: <FaLock className="text-amber-400 text-xl" />,
    },
    {
      id: 2,
      title: t("features.codeOwnership.title"),
      desc: t("features.codeOwnership.desc"),
      icon: <FaCode className="text-amber-400 text-xl" />,
    },
    {
      id: 3,
      title: t("features.backupSsl.title"),
      desc: t("features.backupSsl.desc"),
      icon: <FaServer className="text-amber-400 text-xl" />,
    },
    {
      id: 4,
      title: t("features.integration.title"),
      desc: t("features.integration.desc"),
      icon: <FaNetworkWired className="text-amber-400 text-xl" />,
    },
    {
      id: 5,
      title: t("features.scalability.title"),
      desc: t("features.scalability.desc"),
      icon: <FaChartLine className="text-amber-400 text-xl" />,
    },
    {
      id: 6,
      title: t("features.slaSupport.title"),
      desc: t("features.slaSupport.desc"),
      icon: <FaShieldAlt className="text-amber-400 text-xl" />,
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 px-4 lg:px-12 bg-white">
      {/* الحاوية الكبرى ذات الخلفية الزرقاء الداكنة المنحنية */}
      <div className="relative max-w-7xl mx-auto bg-[#071E3D] rounded-[2.5rem] py-16 px-6 md:px-12 text-white overflow-hidden shadow-2xl">
        {/* تأثيرات إضاءة خفيفة بالخلفية */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center space-y-10">
          {/* شارة التصنيف العلوية */}
          <div className="bg-[#172D4D] border border-blue-900/50 text-blue-200 px-5 py-2 rounded-xl text-xs md:text-sm font-bold tracking-wide">
            {t("statusBadge")}
          </div>

          {/* العنوان الرئيسي والوصف */}
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              {t("title")}
            </h2>
            <p className="text-blue-200 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* شبكة الميزات الست */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pt-6 text-start">
            {features.map((item) => (
              <div
                key={item.id}
                className="bg-[#0D264A]/80 border border-blue-900/40 rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:bg-[#112F58]"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-950/60 flex items-center justify-center shrink-0 border border-blue-800/30">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-blue-200/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* أزرار اتخاذ الإجراء بالأسفل */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-8">
            <Link
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(t("whatsappMsg"))}`}
              target="_blank"
              aria-label={t("ctaBook")}
              className="w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-xl font-black text-base shadow-lg transition-all duration-300 text-center"
            >
              {t("ctaBook")}
            </Link>

            <Link
              href={`tel:+${phoneNumber}`}
              aria-label={t("ctaQuote")}
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border-2 border-blue-800/60 px-8 py-4 rounded-xl font-black text-base transition-all duration-300 text-center"
            >
              {t("ctaQuote")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
