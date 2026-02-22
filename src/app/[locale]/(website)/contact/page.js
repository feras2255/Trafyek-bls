import { siteSettings } from "@/lib/siteSettings";
import { FaLocationDot, FaPhoneFlip, FaWhatsapp } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import ContactForm from "./_Component/ContactForm";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";

export default async function ContactPage() {
  const settings = await siteSettings();
  if (!settings) return null;

  const contactInfo = [
    {
      icon: <FaWhatsapp size={22} />,
      title: "واتساب",
      value: settings.phone,
      color: "hover:text-green-500",
      link: `https://wa.me/${settings.phone}`,
    },
    {
      icon: <MdOutlineEmail size={22} />,
      title: "البريد الإلكتروني",
      value: settings.email,
      color: "hover:text-blue-500",
      link: `mailto:${settings.email}`,
    },
    {
      icon: <FaPhoneFlip size={22} />,
      title: "الهاتف",
      value: settings.phone,
      color: "hover:text-primary",
      link: `tel:${settings.phone}`,
    },
    {
      icon: <FaLocationDot size={22} />,
      title: "المقر الرئيسي",
      value: "الرياض، المملكة العربية السعودية",
      color: "hover:text-red-500",
      link: "#",
    },
  ];

  const breadcrumbData = [{ label: "اتصل بنا" }];

  return (
    <section>
      <PageHero
        title="لنبني شيئاً مذهلاً معاً!"
        description="سواء كان لديك مشروع جديد أو مجرد استفسار، فريق ترافيك جاهز لتحويل أفكارك إلى واقع رقمي ملموس."
        breadcrumb={breadcrumbData}
        bgImage="/co-hero.png"
      />

      <div id="contact" className="relative">
        <div className="container mx-auto px-4 sm:px-6 py-12 lg:py-24">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            <div className="w-full lg:w-5/12 order-1 space-y-8 lg:space-y-12">
              <div className="text-center lg:text-right" data-aos="fade-up">
                <h3 className="text-2xl lg:text-3xl font-black text-slate-900 mb-4">
                  معلومات التواصل
                </h3>
                <p className="text-slate-600 leading-relaxed text-base lg:text-lg">
                  يسعدنا استقبال استفساراتكم. فريقنا المبدع متواجد دائماً لتقديم
                  الدعم الفني والاستشارات الرقمية.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-6">
                {contactInfo.map((info, idx) => (
                  <Link
                    href={info.link}
                    key={idx}
                    className="group flex items-center gap-4 lg:gap-6 p-2 lg:py-4 lg:px-8 rounded-xl bg-primary/10 lg:bg-transparent transition-all duration-300 active:scale-95 lg:hover:bg-white lg:hover:shadow-xl border border-transparent lg:hover:border-gray-100"
                  >
                    <div className="flex-shrink-0 w-10 h-10 lg:w-14 lg:h-14 bg-accent text-text rounded-xl lg:rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-6 shadow-md">
                      {info.icon}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] lg:text-xs font-bold text-primary uppercase tracking-widest">
                        {info.title}
                      </span>
                      <p className="text-slate-900 font-black text-sm lg:text-lg break-all">
                        {info.value}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="hidden sm:block p-6 bg-primary/5 rounded-2xl border border-primary/10 text-center lg:text-right">
                <h4 className="font-bold text-slate-900 mb-1">ساعات العمل</h4>
                <p className="text-subtext text-sm">
                  الأحد - الخميس: 9:00 ص - 6:00 م
                </p>
              </div>
            </div>

            <div
              className="w-full lg:w-7/12 order-2 lg:order-1 md:p-12  "
              data-aos="fade-up"
            >
              <div className="mb-8 px-3 text-center ">
                <h2 className="text-2xl lg:text-3xl font-black text-accent mb-2">
                  أرسل لنا رسالة
                </h2>
                <p className="text-subtext text-sm lg:text-base">
                  سنقوم بالرد عليك خلال أقل من 24 ساعة عمل.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
