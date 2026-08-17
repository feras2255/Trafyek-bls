import { supabase } from "@/lib/supabaseClient";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";

import {
  FiClock,
  FiTag,
  FiCalendar,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import Link from "next/link";
import ArticleShare from "@/components/ui/ArticleShare";

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
      canonical: `https://www.trafyekbls.com/${locale}/blogs/${id}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://www.trafyekbls.com/${locale}/blogs/${id}`,
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

  const breadcrumb = [
    {
      label: isAr ? "المدونة" : "Blog",
      href: `/${locale}/blogs`,
    },
    {
      label: isAr ? "قراءة المقال" : "Read Post",
      href: null,
    },
  ];

  const excerpt = content?.replace(/<[^>]*>?/gm, "")?.substring(0, 220) || "";

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
              "@id": `https://www.trafyekbls.com/${locale}/blogs/${id}`,
            },
          }),
        }}
      />
      {/* Header / Hero Section */}
      <PageHero
        title={isAr ? "مدونة ترافيك بلس" : "Traffic Plus Blog"}
        description={
          isAr
            ? "مقالات تقنية وتسويقية متخصصة."
            : "Technical and marketing articles."
        }
        breadcrumbData={breadcrumb}
        isAr={isAr}
      />

      {/* Main Content */}
      <div className="container mx-auto -mt-10">
        <div className=" px-3 md:px-16 ">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-72 h-48">
                <Image
                  src={post.image_url || "/he.png"}
                  alt={title}
                  fill
                  priority
                  className="object-contain rounded-lg"
                />
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span className="flex gap-2 bg-primary text-white px-2 py-2 rounded-lg text-[10px] md:text-sm font-bold">
                  <FiTag />
                  <span className="ms-2">{category}</span>
                </span>

                <span className="flex gap-2 bg-primary text-white px-2 py-2 rounded-lg text-[10px] md:text-sm font-bold">
                  <FiCalendar />
                  {date}
                </span>

                <span className="flex gap-2 bg-primary text-white px-2 py-2 rounded-lg text-[10px] md:text-sm font-bold">
                  <FiClock />
                  {isAr ? "قراءة ٥ دقائق" : "5 min read"}
                </span>
              </div>
            </div>

            <h1 className="mt-4 text-base md:text-3xl font-black text-accent leading-tight mb-6">
              {title}
            </h1>
          </div>

          {/* Rich Text Content */}
          <div className="prose prose-lg prose-primary max-w-none">
            <div
              className="text-t-second leading-[2.2] text-base md:text-lg whitespace-pre-wrap font-medium"
              style={{
                direction: isAr ? "rtl" : "ltr",
                textAlign: isAr ? "right" : "left",
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
          {/* Footer of the article */}
          <ArticleShare title={title} slug={id} locale={locale} />
        </div>
      </div>
    </article>
  );
}
