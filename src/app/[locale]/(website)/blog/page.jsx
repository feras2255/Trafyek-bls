import PageHero from "@/components/ui/PageHero";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowUpLeft, FiClock, FiTag } from "react-icons/fi";

export default async function Blog() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  const breadcrumb = [{ label: isAr ? "المدونة" : "Blog", href: null }];

  // بيانات تجريبية للمقالات (يمكنك استبدالها ببيانات من Supabase لاحقاً)
  const posts = [
    {
      id: 1,
      title: "كيف تزيد مبيعات متجرك الإلكتروني في السوق السعودي؟",
      excerpt:
        "تعرف على أهم الاستراتيجيات التسويقية والتقنية لتحسين أداء متجرك وزيادة التحويلات...",
      date: "24 مارس 2026",
      category: "تجارة إلكترونية",
      image: "/s-hero.png",
    },
    {
      id: 2,
      title: "أهمية تجربة المستخدم UI/UX في نجاح التطبيقات",
      excerpt:
        "لماذا يعتبر التصميم هو العامل الحاسم في بقاء المستخدم داخل تطبيقك أو مغادرته فوراً؟",
      date: "20 مارس 2026",
      category: "تصميم",
      image: "/serv-hero.png",
    },
    {
      id: 3,
      title: "مستقبل تقنيات Next.js في عام 2026",
      excerpt:
        "نظرة عميقة على التحديثات الأخيرة وكيف تساهم في تسريع المواقع بشكل غير مسبوق.",
      date: "15 مارس 2026",
      category: "برمجة",
      image: "/he.png",
    },
  ];

  return (
    <section className="pb-24 bg-[#fcfcfd]">
      <PageHero
        title={isAr ? "مدونة ترافيك بلس" : "Traffic Plus Blog"}
        description={
          isAr
            ? "مقالات تقنية وتسويقية متخصصة لمساعدتك في تنمية أعمالك الرقمية."
            : "Technical and marketing articles to help you grow your digital business."
        }
        breadcrumbData={breadcrumb}
        showButtons
      />

      <div className="container mx-auto px-6 mt-24 relative z-10">
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <Image
                  src={post.image || "/he.png"} // صورة افتراضية
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute top-6 right-6 z-20 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-accent flex items-center gap-2">
                  <FiTag className="text-primary" /> {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-4 text-slate-400 text-xs font-bold">
                  <span className="flex items-center gap-1">
                    <FiClock /> {post.date}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-accent leading-tight group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-subtext text-sm leading-relaxed line-clamp-3 font-medium">
                  {post.excerpt}
                </p>

                <div className="pt-4">
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-accent font-black text-sm group/btn"
                  >
                    {isAr ? "اقرأ المزيد" : "Read More"}
                    <span className="size-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all">
                      <FiArrowUpLeft className="text-lg" />
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA section */}
        <div className="relative pt-32 pb-10">
          <div className="relative group">
            {/* تأثير الإضاءة الخلفية (Glow Effect) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-purple-600 to-accent rounded-[4rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative bg-accent rounded-[3.5rem] py-20 px-4 md:px-24 overflow-hidden shadow-2xl border border-white/5">
              {/* عناصر هندسية متحركة في الخلفية */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-40 -mt-40 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] -ml-20 -mb-20" />

              {/* شبكة خفيفة (Pattern) لإضافة ملمس للتصميم */}
              <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">
                <div className="text-right lg:w-2/3 space-y-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.2em]">
                      لنبنِ شيئاً عظيماً
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                    حول فكرتك إلى <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-white italic">
                      إمبراطورية رقمية
                    </span>
                  </h2>

                  <p className="text-white/60 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                    نحن لا نصمم مجرد واجهات، نحن نصمم رحلات نجاح تبدأ بكود متقن
                    وتنتهي بأرباح حقيقية. هل أنت مستعد للخطوة التالية؟
                  </p>
                </div>

                <div className="flex flex-col gap-5 w-full lg:w-auto">
                  <Link
                    href="https://wa.me/966530446151"
                    className="group relative px-12 py-6 bg-primary text-white font-black text-xl rounded-2xl shadow-[0_20px_50px_rgba(124,58,237,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
                  >
                    <span className="relative z-10">
                      {isAr ? "ابدأ مشروعك الآن" : "Start Project"}
                    </span>
                    <FiArrowUpLeft className="relative z-10 text-2xl group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  </Link>

                  <a
                    href="https://wa.me/966530446151"
                    target="_blank"
                    className="flex items-center justify-center gap-3 px-10 py-5 bg-white/5 border border-white/10 text-white font-bold text-lg rounded-2xl hover:bg-white/10 backdrop-blur-xl transition-all"
                  >
                    <FaWhatsapp className="text-[#25D366] size-6" />
                    {isAr ? "استشارة مجانية" : "Free Consultation"}
                  </a>
                </div>
              </div>

              {/* شريط السفلي (Trust Indicators) */}
              <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center lg:justify-start gap-10 opacity-40 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-xs font-bold tracking-widest uppercase">
                  ✓ ضمان الأداء الفائق
                </p>
                <p className="text-white text-xs font-bold tracking-widest uppercase">
                  ✓ دعم فني 24/7
                </p>
                <p className="text-white text-xs font-bold tracking-widest uppercase">
                  ✓ تصميم مخصص 100%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
