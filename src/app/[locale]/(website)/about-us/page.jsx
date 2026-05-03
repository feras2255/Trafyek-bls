export const revalidate = 0;

import PageHero from "@/components/ui/PageHero";
import { getPageContent } from "@/lib/pages";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiCheckCircle,
  FiTarget,
  FiStar,
  FiUsers,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";

export async function generateMetadata() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  return {
    title: isAr
      ? "من نحن | ترافيك بلس - حلول البرمجة والتسويق الرقمي"
      : "About Us | Traffic Plus - Programming & Digital Marketing",
    description: isAr
      ? "تعرف على ترافيك بلس، شريكك التقني في تصميم وتطوير المواقع والمتاجر الإلكترونية."
      : "Discover Traffic Plus, your tech partner in website and e-commerce development.",
    alternates: {
      canonical: `https://www.trafyekbls.com/${isAr ? "ar" : "en"}/about-us`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: isAr ? "من نحن | ترافيك بلس" : "About Us | Traffic Plus",
      description: isAr
        ? "رحلة ترافيك بلس في تقديم حلول برمجية وتسويقية متقدمة."
        : "Traffic Plus journey in providing advanced programming and marketing solutions.",
      url: `https://www.trafyekbls.com/${isAr ? "ar" : "en"}/about-us`,
      siteName: "ترافيك بلس - Traffic Plus",
      images: [
        {
          url: "/about-visual.png",
          width: 1200,
          height: 630,
          alt: isAr ? "فريق ترافيك بلس" : "Traffic Plus Team",
        },
      ],
      locale: isAr ? "ar_SA" : "en_US",
      type: "website",
    },
  };
}

export default async function About() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  const { data: page } = await supabaseAdmin
    .from("pages")
    .select("*")
    .eq("slug", "about-us")
    .single();

  if (!page)
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-accent">
          {isAr ? "الصفحة غير موجودة." : "Page not found."}
        </p>
      </div>
    );

  const { title, content } = getPageContent(page, isAr);

  const breadcrumb = [{ label: isAr ? "من نحن" : "About Us", href: null }];

  const stats = [
    {
      label: isAr ? "مشروع ناجح" : "Successful Projects",
      val: "+250",
      icon: FiCheckCircle,
    },
    {
      label: isAr ? "شريك نجاح" : "Success Partners",
      val: "+220",
      icon: FiUsers,
    },
    {
      label: isAr ? "سنوات خبرة" : "Years of Experience",
      val: "+6",
      icon: FiStar,
    },
    {
      label: isAr ? "رضا العملاء" : "Client Satisfaction",
      val: "100%",
      icon: FiAward,
    },
  ];

  const features = [
    {
      t: isAr ? "فهم السوق الخليجي" : "Gulf Market Expertise",
      d: isAr
        ? "خبرة متخصصة في احتياجات العميل السعودي."
        : "Specialized experience in Saudi & Gulf client needs.",
    },
    {
      t: isAr ? "أداء فائق السرعة" : "High Performance",
      d: isAr
        ? "مواقع تعمل بتقنيات Next.js تضمن سرعة البرق."
        : "Next.js-powered websites with lightning-fast speed.",
    },
    {
      t: isAr ? "تصميم UI/UX مميز" : "Distinctive UI/UX Design",
      d: isAr
        ? "واجهات UI/UX مصممة لزيادة معدل التحويل."
        : "Interfaces designed to maximize conversion rates.",
    },
    {
      t: isAr ? "دعم فني بشري" : "Human Technical Support",
      d: isAr
        ? "تواصل مباشر مع مهندسين تقنيين 24/7."
        : "Direct access to technical engineers 24/7.",
    },
  ];

  return (
    <section className="pb-24">
      <PageHero
        title={isAr ? "من نحن" : "About Us"}
        description={
          isAr
            ? "تعرف على رحلة ترافيك في صياغة المستقبل الرقمي وتقديم حلول تقنية تسبق التوقعات."
            : "Discover Traffic Plus's journey in shaping the digital future with solutions beyond expectations."
        }
        breadcrumbData={breadcrumb}
        showButtons
      />

      <div className="container mx-auto px-4 lg:px-6 mt-20 relative z-10 space-y-32">
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-16 items-center">
          <div className="">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black tracking-widest uppercase mb-6">
              {isAr ? "قصتنا ونجاحنا" : "Our Story & Success"}
            </span>
            <div
              className={`flex items-center gap-4 mb-8 ${isAr ? "flex-row" : "flex-row-reverse lg:flex-row"}`}
            >
              <div className="w-2 h-12 bg-primary rounded-full shrink-0" />
              <h1 className="text-3xl md:text-5xl font-black text-accent tracking-tight leading-tight">
                {title}
              </h1>
            </div>

            <div
              className="prose prose-lg max-w-none text-subtext leading-[2.2]
              prose-headings:text-accent prose-headings:font-black
              prose-p:text-lg prose-p:font-medium
              prose-strong:text-primary prose-strong:font-black"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          <div className="">
            <div className="relative h-64 md:h-[480px] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
              <Image
                src="/about-visual.png"
                alt={isAr ? "فريق ترافيك" : "Traffic Plus Team"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-transparent to-transparent flex items-end p-10">
                <div className="text-text">
                  <p className="text-primary font-black mb-2 tracking-[0.2em] uppercase text-xs">
                    Innovation Hub
                  </p>
                  <p className="text-base md:text-2xl font-black leading-tight">
                    {isAr
                      ? "نصنع المستقبل.. بكود إبداعي"
                      : "Building the future.. with creative code"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-card py-6 px-4 rounded-2xl border border-background-2 shadow-xs text-center space-y-2"
            >
              <p className="text-4xl md:text-5xl font-black text-accent tracking-tighter">
                {stat.val}
              </p>
              <p className="text-sm text-subtext font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Vision & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-accent text-text py-12 px-6 md:p-12 rounded-2xl md:rounded-[3.5rem] relative overflow-hidden shadow-xl">
            <div className="absolute -top-10 -right-10 size-40 bg-primary/20 rounded-full blur-3xl" />
            <FiTarget className="text-primary size-16 mb-8 relative z-10" />
            <h3 className="text-3xl font-black mb-6 relative z-10 italic">
              {isAr ? "رؤيتنا" : "Our Vision"}
            </h3>
            <p className="text-text/80 leading-relaxed text-base md:text-xl font-medium relative z-10">
              {isAr
                ? "أن نكون المحرك التقني الأول في منطقة الخليج، لتمكين العلامات التجارية من الريادة الرقمية عبر حلول برمجية ذكية تتجاوز حدود الخيال."
                : "To be the leading tech driver in the Gulf region, empowering brands to achieve digital leadership through smart solutions that go beyond imagination."}
            </p>
          </div>

          <div className="bg-card border border-slate-100 py-12 px-6 md:p-12 rounded-3xl md:rounded-[3.5rem] shadow-sm">
            <h3 className="text-2xl font-black text-accent mb-10 flex items-center gap-3">
              <FiTrendingUp className="text-primary" />
              {isAr ? "ميزاتنا التنافسية" : "Our Competitive Advantages"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
              {features.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2 text-accent font-black">
                    <FiCheckCircle className="text-primary shrink-0" />
                    <span>{item.t}</span>
                  </div>
                  <p
                    className={`text-subtext text-sm leading-relaxed ${isAr ? "pr-6" : "pl-6"}`}
                  >
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden bg-accent rounded-3xl md:rounded-[3.5rem]">
          <div className="py-12 px-6 md:p-20 text-center relative z-10 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute -top-24 -right-24 size-96 bg-primary rounded-full blur-[100px]" />
              <div className="absolute -bottom-24 -left-24 size-96 bg-primary rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto space-y-10 relative z-20">
              <h2 className="text-2xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                {isAr ? (
                  <>
                    هل أنت مستعد لتحويل رؤيتك الرقمية إلى{" "}
                    <span className="text-primary italic">واقع ملموس؟</span>
                  </>
                ) : (
                  <>
                    Ready to turn your digital vision into{" "}
                    <span className="text-primary italic">reality?</span>
                  </>
                )}
              </h2>

              <p className="text-text/70 text-base md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
                {isAr
                  ? "انضم إلى قائمة النخبة من شركاء نجاحنا ودعنا نبني لك منصة تجمع بين الفخامة والأداء."
                  : "Join our elite list of success partners and let us build you a platform that combines luxury and performance."}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                <Link
                  href="https://wa.me/966530446151"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={isAr ? "ابداء رحلتك الآن" : "Start Your Journey"}
                  className="group relative w-full md:w-auto px-12 py-5 bg-primary text-text font-black text-xl rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">
                    {isAr ? "ابدأ رحلتك الآن" : "Start Your Journey"}
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </Link>

                <a
                  href="https://wa.me/966530446151"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={isAr ? "استشارة مجانية" : "Free Consultation"}
                  className="flex items-center gap-3 w-full md:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all"
                >
                  <FaWhatsapp className="text-[#25D366] size-7" />
                  {isAr ? "استشارة مجانية" : "Free Consultation"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
