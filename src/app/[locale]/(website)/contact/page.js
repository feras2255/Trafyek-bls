import { siteSettings } from "@/lib/siteSettings";
import { FaLocationDot, FaPhoneFlip, FaWhatsapp } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import ContactForm from "./_Component/ContactForm";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { getLocale } from "next-intl/server";

export default async function ContactPage() {
  const locale = await getLocale();
  const isAr = locale === "ar";
  const settings = await siteSettings();

  if (!settings) return null;

  const contactInfo = [
    {
      icon: <FaWhatsapp size={28} />,
      title: "واتساب مباشر",
      value: settings.phone,
      styles: "bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20",
      link: settings.phone
        ? `https://wa.me/${settings.phone.replace(/\s+/g, "")}`
        : "#",
    },
    {
      icon: <MdOutlineEmail size={28} />,
      title: "البريد الرسمي",
      value: settings.email,
      styles: "bg-blue-50 text-blue-600 border-blue-100",
      link: settings.email ? `mailto:${settings.email}` : "#",
    },
    {
      icon: <FaPhoneFlip size={24} />,
      title: "خدمة العملاء",
      value: settings.phone,
      styles: "bg-primary/10 text-primary border-primary/20",
      link: settings.phone ? `tel:${settings.phone}` : "#",
    },
    {
      icon: <FaLocationDot size={26} />,
      title: "المقر الرئيسي",
      value: "الرياض، المملكة العربية السعودية",
      styles: "bg-red-50 text-red-600 border-red-100",
      link: "#",
    },
  ];
  const breadcrumb = [{ label: isAr ? "اتصل بنا" : "Contact", href: null }];

  return (
    <section className="bg-[#fcfcfd]">
      <PageHero
        title="لنبني شيئاً مذهلاً معاً!"
        description="سواء كان لديك مشروع جديد أو مجرد استفسار، فريق ترافيك جاهز لتحويل أفكارك إلى واقع رقمي ملموس."
        breadcrumbData={breadcrumb}
      />

      <div
        id="contact"
        className="container mx-auto px-6 py-24 lg:py-32 relative z-10"
      >
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          {/* Contact Form */}
          <div className="w-full lg:w-7/12 bg-text py-8 md:p-16 rounded-[3.5rem] shadow-2xl shadow-slate-200/40 border border-slate-50 relative overflow-hidden group order-2 md:order-1">
            <div className="absolute top-0 right-0 size-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32 transition-all group-hover:bg-primary/10" />

            <div className="mb-12 relative z-10 px-4">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-4">
                تواصل معنا
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter italic">
                أرسل لنا <span className="text-primary italic">رسالة</span>
              </h2>
              <p className="text-slate-500 font-bold text-base md:text-lg max-w-md">
                فريقنا التقني سيقوم بمراجعة طلبك والرد عليك في أقل من 24 ساعة.
              </p>
            </div>

            <ContactForm />
          </div>

          {/* information*/}
          <div className="w-full lg:w-5/12 space-y-12 order-1 md:order-2">
            <div className="pr-4">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">
                قنوات التواصل المباشرة
              </h3>
              <p className="text-slate-500 leading-relaxed text-base md:text-lg font-medium">
                يسعدنا دائماً سماع أفكارك، يمكنك التواصل معنا عبر الوسيلة الأنسب
                لك.
              </p>
            </div>

            {/* contact info */}
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, idx) => (
                <Link
                  href={info.link}
                  key={idx}
                  className="group flex items-center gap-6 py-6 px-3 md:p-6 rounded-[2.5rem] transition-all duration-500 bg-white border border-slate-100 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
                >
                  <div
                    className={`flex-shrink-0 size-20 rounded-[1.5rem] flex items-center justify-center border transition-all duration-700 group-hover:scale-110 group-hover:rotate-[10deg] ${info.styles}`}
                  >
                    {info.icon}
                  </div>

                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                      {info.title}
                    </span>
                    <p className="text-slate-900 font-black text-lg md:text-2xl break-all leading-tight">
                      {info.value}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Card Time of work */}
            <div className="py-10 px-5 md:p-10 bg-accent text-text rounded-2xl md:rounded-[3.5rem] shadow-2xl shadow-accent/20 relative overflow-hidden group border border-white/5">
              <div className="absolute -top-10 -right-10 size-40 bg-primary/20 rounded-full blur-[80px] group-hover:size-60 transition-all duration-700" />

              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="size-3 bg-primary rounded-full animate-ping shadow-[0_0_15px_#7c3aed]"></span>
                  <h4 className="font-black text-xl md:text-2xl tracking-tight">
                    ساعات العمل الرسمية
                  </h4>
                </div>
                <div className="h-px bg-white/10 w-full" />
                <p className="text-white/70 font-bold text-lg md:text-xl pr-6 leading-relaxed">
                  الأحد - الخميس:{" "}
                  <span className="text-white">9:00 ص - 6:00 م</span>
                  <br />
                  <span className="text-xs text-white/40 font-medium">
                    نحن متاحون للرد على رسائل الواتساب طوال أيام الأسبوع
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
