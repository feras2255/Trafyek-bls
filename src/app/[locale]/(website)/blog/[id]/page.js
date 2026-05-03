import { supabase } from "@/lib/supabaseClient";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import {
  FiClock,
  FiTag,
  FiCalendar,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import Link from "next/link";

// توليد الميتا داتا ديناميكياً بناءً على بيانات المقال
export async function generateMetadata({ params }) {
  const { id } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";

  // جلب بيانات المقال للميتا تاقز
  const { data: post } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (!post) return { title: isAr ? "المقال غير موجود" : "Post Not Found" };

  const title = isAr ? post.title_ar : post.title_en;
  // تنظيف الوصف من تاقز HTML إذا كان مخزناً كـ Rich Text
  const description = (isAr ? post.description_ar : post.description_en)
    ?.replace(/<[^>]*>?/gm, "")
    ?.substring(0, 160);

  return {
    title: `${title} | ترافيك بلس`,
    description: description,
    alternates: {
      canonical: `https://www.trafyekbls.com/${locale}/blog/${id}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://www.trafyekbls.com/${locale}/blog/${id}`,
      siteName: "ترافيك بلس - Traffic Plus",
      type: "article",
      publishedTime: post.created_at,
      images: [
        {
          url: post.image_url || "/he.png",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: isAr ? "ar_SA" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [post.image_url || "/he.png"],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";

  //  fetch data from Supabase
  const { data: post, error } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          {isAr ? "المقال غير موجود" : "Post Not Found"}
        </h1>
      </div>
    );
  }

  const title = isAr ? post.title_ar : post.title_en;
  const content = isAr ? post.description_ar : post.description_en;
  const category = isAr ? post.category_ar : post.category_en;
  const date = new Date(post.created_at).toLocaleDateString(
    isAr ? "ar-EG" : "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  return (
    <article className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: title,
            image: post.image_url || "/he.png",
            datePublished: post.created_at,
            dateModified: post.updated_at || post.created_at,
            author: {
              "@type": "Organization",
              name: "ترافيك بلس",
              url: "https://www.trafyekbls.com",
            },
            publisher: {
              "@type": "Organization",
              name: "ترافيك بلس",
              logo: {
                "@type": "ImageObject",
                url: "https://www.trafyekbls.com/favicon.png",
              },
            },
            description: content?.replace(/<[^>]*>?/gm, "")?.substring(0, 160),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://www.trafyekbls.com/${locale}/blog/${id}`,
            },
          }),
        }}
      />
      {/* Header / Hero Section */}
      <header className="relative h-[70vh] md:h-[90vh] w-full">
        <Image
          src={post.image_url || "/he.png"}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl space-y-6">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors text-sm mb-4"
              >
                {isAr ? <FiChevronRight /> : <FiChevronLeft />}
                {isAr ? "العودة للمدونة" : "Back to Blog"}
              </Link>

              <div className="flex items-center gap-3">
                <span className="bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {category}
                </span>
              </div>

              <h1 className="text-2xl md:text-6xl font-black text-white leading-tight">
                {title}
              </h1>

              <div className="flex items-center gap-6 text-white/90 font-medium">
                <span className="flex items-center gap-2">
                  <FiCalendar className="text-primary" /> {date}
                </span>
                <span className="flex items-center gap-2">
                  <FiClock className="text-primary" />
                  {isAr ? "قراءة ٥ دقائق" : "5 min read"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:`px-6 relative z-20">
        <div className="py-8 px-2 md:p-16 shadow-2xl shadow-black/5 border border-slate-50">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <span className="bg-accent text-text px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {category}
              </span>
              <span className="bg-accent text-text px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {isAr ? "مقالات" : "Blogs"}
              </span>
              <span className="bg-accent text-text px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {isAr ? "ترافيك بلس" : "Traffic Blog"}
              </span>
            </div>
          </div>
          {/* Rich Text Content */}
          <div
            className="prose prose-sm md:prose-xl max-w-none prose-slate prose-headings:font-black prose-headings:text-accent prose-p:leading-relaxed prose-img:rounded-3xl rtl:text-right"
            style={{
              direction: isAr ? "rtl" : "ltr",
              textAlign: isAr ? "right" : "left",
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Footer of the article */}
          <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6 py-6 px-0 md:px-6 bg-slate-50/50 rounded-3xl border border-slate-100">
              <div className="flex items-center gap-4">
                <div className="size-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm overflow-hidden p-2">
                  <Image
                    src="/favicon.png"
                    alt="ترافيك بلس"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                <div className="flex flex-col">
                  <h4 className="font-black text-accent text-lg">
                    {isAr ? "الناشر: ترافيك بلس" : "Publisher: Traffic Plus"}
                  </h4>
                  <p className="text-slate-500 text-sm font-bold">
                    {isAr
                      ? "وكالة رقمية متخصصة في ابتكار الحلول التقنية"
                      : "Digital agency specializing in innovative tech solutions"}
                  </p>
                </div>
              </div>

              <div className="h-px md:h-10 w-full md:w-px bg-slate-200" />

              <Link
                href={`/${locale}`}
                className="group flex items-center gap-3 text-primary font-black text-sm hover:gap-4 transition-all"
              >
                {isAr ? "زيارة الموقع الرئيسي" : "Visit Main Website"}
                <span
                  className={`size-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all ${isAr ? "rotate-0" : "rotate-180"}`}
                >
                  {isAr ? <FiChevronLeft /> : <FiChevronRight />}
                </span>
              </Link>
            </div>

            <Link
              href={`/${locale}/blog`}
              className="bg-accent text-text px-8 py-3 rounded-lg font-bold hover:bg-accent/90 transition-all shadow-lg shadow-accent/10"
            >
              {isAr ? "مقالات أخرى" : "More Articles"}
            </Link>
          </footer>
        </div>
      </div>
    </article>
  );
}
