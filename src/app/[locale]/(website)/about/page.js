export const revalidate = 0;

import PageHero from "@/components/ui/PageHero";
import { supabase } from "@/lib/supabaseClient";
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

export default async function About() {
  const locale = await getLocale();
  const isAr = locale === "ar";
  const { data: page } = await supabase
    .from("pages")
    .select("title, content")
    .eq("slug", "about-us")
    .single();

  if (!page)
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl font-bold text-accent">الصفحة غير موجودة.</p>
      </div>
    );

  const breadcrumb = [{ label: isAr ? "من نحن" : "About", href: null }];

  return (
    <section className="pb-24">
      <PageHero
        title="من نحن"
        description="تعرف على رحلة ترافيك في صياغة المستقبل الرقمي وتقديم حلول تقنية تسبق التوقعات."
        breadcrumbData={breadcrumb}
        showButtons
      />

      <div className="container mx-auto px-4 lg:px-6 mt-20 relative z-10 space-y-32">
        {/* Main Content information  and image*/}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black tracking-widest uppercase mb-6">
              قصتنا ونجاحنا
            </span>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-2 h-12 bg-primary rounded-full" />
              <h1 className="text-3xl md:text-5xl font-black text-accent tracking-tight leading-tight">
                {page.title}
              </h1>
            </div>

            <div
              className="prose prose-lg max-w-none text-subtext leading-[2.2]
              prose-headings:text-accent prose-headings:font-black 
              prose-p:text-lg prose-p:font-medium
              prose-strong:text-primary prose-strong:font-black"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </div>

          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative h-64 md:h-100 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group">
              <Image
                src="/about-visual.png"
                alt="فريق ترافيك"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/90 via-transparent to-transparent flex items-end p-10">
                <div className="text-text">
                  <p className="text-primary font-black mb-2 tracking-[0.2em] uppercase text-xs">
                    Innovation Hub
                  </p>
                  <p className="text-base md:text-2xl font-black leading-tight">
                    نصنع المستقبل.. بكود إبداعي
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "مشروع ناجح", val: "+250", icon: FiCheckCircle },
            { label: "شريك نجاح", val: "+220", icon: FiUsers },
            { label: "سنوات خبرة", val: "+6", icon: FiStar },
            { label: "رضا العملاء", val: "100%", icon: FiAward },
          ].map((stat, i) => (
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

        {/* our values and features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* our vision */}
          <div className="bg-accent text-text py-12 px-6 md:p-12 rounded-2xl md:rounded-[3.5rem] relative overflow-hidden group shadow-xl">
            <div className="absolute -top-10 -right-10 size-40 bg-primary/20 rounded-full blur-3xl" />
            <FiTarget className="text-primary size-16 mb-8 relative z-10" />
            <h3 className="text-3xl font-black mb-6 relative z-10 italic">
              رؤيتنا
            </h3>
            <p className="text-text/80 leading-relaxed text-base md:text-xl font-medium relative z-10">
              أن نكون المحرك التقني الأول في منطقة الخليج، لتمكين العلامات
              التجارية من الريادة الرقمية عبر حلول برمجية ذكية تتجاوز حدود
              الخيال.
            </p>
          </div>

          {/* our features */}
          <div className="bg-card border border-slate-100 py-12 px-6 md:p-12 rounded-3xl md:rounded-[3.5rem] shadow-sm">
            <h3 className="text-2xl font-black text-accent mb-10 flex items-center gap-3">
              <FiTrendingUp className="text-primary" /> ميزاتنا التنافسية
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
              {[
                {
                  t: "فهم السوق الخليجي",
                  d: "خبرة متخصصة في احتياجات العميل السعودي.",
                },
                {
                  t: "أداء فائق السرعة",
                  d: "مواقع تعمل بتقنيات Next.js تضمن سرعة البرق.",
                },
                {
                  t: "تصميم UI/UX مميز",
                  d: "واجهات UI/UX مصممة لزيادة معدل التحويل.",
                },
                { t: "دعم فني بشري", d: "تواصل مباشر مع مهندسين تقنيين 24/7." },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2 text-accent font-black">
                    <FiCheckCircle className="text-primary shrink-0" />
                    <span>{item.t}</span>
                  </div>
                  <p className="text-subtext text-sm leading-relaxed pr-6">
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="relative overflow-hidden bg-accent rounded-3xl md:rounded-[3.5rem]">
          <div className=" py-12 px-6 md:p-20 text-center relative z-10 shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <div className="absolute -top-24 -right-24 size-96 bg-primary rounded-full blur-[100px]" />
              <div className="absolute -bottom-24 -left-24 size-96 bg-primary rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto space-y-10 relative z-20">
              <h2 className="text-2xl md:text-6xl font-black text-white leading-tight tracking-tighter">
                هل أنت مستعد لتحويل رؤيتك الرقمية إلى{" "}
                <span className="text-primary italic">واقع ملموس؟</span>
              </h2>

              <p className="text-text/70 text-base md:text-2xl font-medium leading-relaxed max-w-2xl mx-auto">
                انضم إلى قائمة النخبة من شركاء نجاحنا ودعنا نبني لك منصة تجمع
                بين الفخامة والأداء.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
                <Link
                  href="https://wa.me/966530446151"
                  className="group relative w-full md:w-auto px-12 py-5 bg-primary text-text font-black text-xl rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">ابدأ رحلتك الآن</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </Link>

                <a
                  href={`https://wa.me/966530446151`}
                  target="_blank"
                  className="flex items-center gap-3 w-full md:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-all"
                >
                  <FaWhatsapp className="text-[#25D366] size-7" />
                  استشارة مجانية
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
