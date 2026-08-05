// import { getTranslations } from "next-intl/server";
// import Link from "next/link";
// import { FaWhatsapp, FaPhoneAlt, FaChartLine } from "react-icons/fa";

// export default async function ServiceRequest() {
//   const t = await getTranslations("serviceRequest");
//   const phoneNumber = "966530446151";

//   return (
//     <section className="relative overflow-hidden py-32 px-4 lg:px-6 bg-[#fafafa]">
//       {/* Dynamic Brand Elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
//         <div className="absolute bottom-[-10%] left-[-5%] w-[40rem] h-[40rem] bg-secondary/20 blur-[150px] rounded-full" />
//       </div>

//       <div className="relative max-w-7xl mx-auto z-10">
//         <div className="flex flex-col items-center text-center space-y-10">
//           {/* Status Badge */}
//           <div className="flex items-center gap-3 bg-white border border-border px-5 py-2.5 rounded-2xl shadow-sm group">
//             <span className="relative flex h-3 w-3">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
//             </span>
//             <span className="text-accent font-black text-xs md:text-sm tracking-wide uppercase">
//               {t("statusBadge")}
//             </span>
//           </div>

//           {/* Main Hero Text */}
//           <div className="space-y-6 max-w-5xl">
//             <h2 className="text-5xl md:text-8xl font-black text-accent leading-tight tracking-tight">
//               {t.rich("heroTitle", {
//                 br: () => <br />,
//                 primary: (chunks) => (
//                   <span className="text-primary italic inline-block mx-1">
//                     {chunks}
//                   </span>
//                 ),
//                 underlined: (chunks) => (
//                   <span className="relative inline-block">
//                     {chunks}
//                     <svg
//                       className="absolute -bottom-2 md:-bottom-4 left-0 w-full"
//                       viewBox="0 0 338 12"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       preserveAspectRatio="none"
//                     >
//                       <path
//                         d="M3 9C118.5 3 226.5 3 335 9"
//                         stroke="#7B3F98"
//                         strokeWidth="6"
//                         strokeLinecap="round"
//                       />
//                     </svg>
//                   </span>
//                 ),
//               })}
//             </h2>

//             <p className="text-subtext text-xl md:text-3xl max-w-3xl mx-auto font-medium leading-relaxed">
//               {t.rich("description", {
//                 accent: (chunks) => (
//                   <span className="text-accent font-black">{chunks}</span>
//                 ),
//               })}
//             </p>

//             <div className="inline-flex items-center gap-3 bg-secondary/10 px-6 py-3 rounded-2xl text-primary">
//               <FaChartLine className="text-2xl" />
//               <span className="font-black text-lg md:text-2xl">
//                 {t("planText")}
//               </span>
//             </div>
//           </div>

//           {/* Conversion Area */}
//           <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center pt-6">
//             <Link
//               href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(t("whatsappMessage"))}`}
//               target="_blank"
//               aria-label="تواصل معنا"
//               className="flex items-center justify-center gap-4 w-full md:w-[350px] bg-primary text-white px-10 py-6 rounded-[2.5rem] shadow-2xl hover:bg-accent transition-all duration-500 font-black text-2xl group"
//             >
//               <span>{t("ctaStart")}</span>
//               <FaWhatsapp className="text-3xl group-hover:rotate-12 transition-transform" />
//             </Link>

//             <Link
//               href={`tel:+${phoneNumber}`}
//               aria-label="اتصل بنا"
//               className="flex items-center justify-center gap-4 w-full md:w-[300px] bg-transparent text-accent border-2 border-accent/20 px-10 py-6 rounded-[2.5rem] hover:bg-white hover:border-primary transition-all duration-500 font-black text-2xl"
//             >
//               <span>{t("ctaCall")}</span>
//               <FaPhoneAlt size={22} />
//             </Link>
//           </div>

//           {/* Social Proof */}
//           <div className="pt-6">
//             <p className="text-subtext/60 font-black text-sm uppercase tracking-[0.3em]">
//               {t("socialProof")}
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
  FaWhatsapp,
  FaPhoneAlt,
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
      title: "اتفاقية سرية (NDA)",
      desc: "حماية كاملة لبياناتكم وأفكاركم قبل بدء العمل.",
      icon: <FaLock className="text-amber-400 text-xl" />,
    },
    {
      id: 2,
      title: "ملكية الكود بالكامل",
      desc: "المشروع ملككم 100% مع تسليم كامل للمصدر.",
      icon: <FaCode className="text-amber-400 text-xl" />,
    },
    {
      id: 3,
      title: "نسخ احتياطي وSSL",
      desc: "استضافة آمنة، نسخ دورية، وشهادات تشفير.",
      icon: <FaServer className="text-amber-400 text-xl" />,
    },
    {
      id: 4,
      title: "تكامل مع أنظمتك",
      desc: "ربط مع ERP وبوابات الدفع والأنظمة الداخلية.",
      icon: <FaNetworkWired className="text-amber-400 text-xl" />,
    },
    {
      id: 5,
      title: "قابلية التوسع",
      desc: "بنية تقنية (Next.js) تتحمل نموكم مستقبلاً.",
      icon: <FaChartLine className="text-amber-400 text-xl" />,
    },
    {
      id: 6,
      title: "دعم واتفاقية SLA",
      desc: "دعم فني ملازم بأوقات استجابة محددة بعد الإطلاق.",
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
            {t("statusBadge") || "للمؤسسات والشركات"}
          </div>

          {/* العنوان الرئيسي والوصف */}
          <div className="space-y-4 max-w-4xl">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
              أمان وموثوقية على مستوى المؤسسات
            </h2>
            <p className="text-blue-200 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed">
              تعامل مع مشاريع الشركات الكبيرة بمعايير أمان والتزام واضحة — ملكية
              كاملة، حماية، وتكامل مع أنظمتكم.
            </p>
          </div>

          {/* شبكة الميزات الست (3 أعمدة في الشاشات الكبيرة) */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full pt-6 text-right"
            dir="rtl"
          >
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
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent("مرحباً، أود الاستفسار عن باقة المؤسسات والشركات")}`}
              target="_blank"
              aria-label="احجز اجتماعاً"
              className="w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-white px-8 py-4 rounded-xl font-black text-base shadow-lg transition-all duration-300 text-center"
            >
              احجز اجتماعاً
            </Link>

            <Link
              href={`tel:+${phoneNumber}`}
              aria-label="اطلب عرض سعر"
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white border-2 border-blue-800/60 px-8 py-4 rounded-xl font-black text-base transition-all duration-300 text-center"
            >
              اطلب عرض سعر
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
