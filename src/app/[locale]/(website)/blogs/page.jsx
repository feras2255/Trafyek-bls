import PageHero from "@/components/ui/PageHero";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpLeft, FiClock, FiTag } from "react-icons/fi";
import { supabase } from "@/lib/supabaseClient";

export async function generateMetadata() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  const title = isAr
    ? "المدونة | ترافيك بلس - مقالات في البرمجة والتسويق"
    : "Blog | Traffic Plus - Tech & Marketing Articles";

  const description = isAr
    ? "استكشف أحدث المقالات التقنية حول تطوير المواقع باستخدام Next.js، وحلول التسويق الرقمي وتطوير المتاجر الإلكترونية في السعودية."
    : "Explore the latest technical articles on web development using Next.js, digital marketing solutions, and e-commerce development in Saudi Arabia.";

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `https://www.trafyekbls.com/${locale}/blog`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://www.trafyekbls.com/${locale}/blog`,
      siteName: "ترافيك بلس - Traffic Plus",
      images: [
        {
          url: "/logo.png",
          width: 1200,
          height: 630,
          alt: isAr ? "مدونة ترافيك بلس" : "Traffic Plus Blog",
        },
      ],
      locale: isAr ? "ar_SA" : "en_US",
      type: "website",
    },
  };
}

export default async function Blog() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  // fetch data from Supabase
  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  const breadcrumb = [{ label: isAr ? "المدونة" : "Blog", href: null }];

  // function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="pb-24 bg-[#fcfcfd]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: isAr ? "مدونة ترافيك بلس" : "Traffic Plus Blog",
            description: isAr
              ? "مقالات تقنية وتسويقية متخصصة لمساعدتك في تنمية أعمالك الرقمية."
              : "Technical and marketing articles to help you grow your digital business.",
            url: `https://www.trafyekbls.com/${locale}/blog`,
            publisher: {
              "@type": "Organization",
              name: "ترافيك بلس",
              logo: {
                "@type": "ImageObject",
                url: "https://www.trafyekbls.com/favicon.png",
              },
            },
            blogPost: blogs?.map((post) => ({
              "@type": "BlogPosting",
              headline: isAr ? post.title_ar : post.title_en,
              image: post.image_url,
              datePublished: post.created_at,
              url: `https://www.trafyekbls.com/${locale}/blog/${post.id}`,
            })),
          }),
        }}
      />
      <PageHero
        title={isAr ? "مدونة ترافيك بلس" : "Traffic Plus Blog"}
        description={
          isAr
            ? "مقالات تقنية وتسويقية متخصصة لمساعدتك في تنمية أعمالك الرقمية."
            : "Technical and marketing articles to help you grow your digital business."
        }
        breadcrumbData={breadcrumb}
        isAr={isAr}
        showButtons
      />

      <div className="container mx-auto px-6 mt-24 relative z-10">
        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs?.map((post) => {
            // get title, description, and category
            const title = isAr ? post.title_ar : post.title_en;
            const description = isAr
              ? post.description_ar
              : post.description_en;
            const category = isAr ? post.category_ar : post.category_en;

            return (
              <article
                key={post.id}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-3xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2"
                dir={isAr ? "rtl" : "ltr"}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-accent/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <Image
                    src={post.image_url || "/he.png"}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span
                    className={`absolute top-6 ${isAr ? "right-6" : "left-6"} z-20 bg-card/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-accent flex items-center gap-2`}
                  >
                    <FiTag className="text-primary" /> {category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 space-y-4 text-right">
                  <div
                    className={`flex items-center gap-4 text-slate-400 text-xs font-bold ${isAr ? "justify-start" : "justify-start flex-row-reverse"}`}
                  >
                    <span className="flex items-center gap-1">
                      <FiClock /> {formatDate(post.created_at)}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-accent leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {title}
                  </h3>

                  <p className="text-subtext text-sm leading-relaxed line-clamp-3 font-medium">
                    {description}
                  </p>

                  <div className="pt-4">
                    <Link
                      href={`/${locale}/blog/${post.id}`}
                      title={isAr ? "اقراء المزيد" : "Read More"}
                      className="inline-flex items-center gap-2 text-accent font-black text-sm group/btn"
                    >
                      {isAr ? "اقرأ المزيد" : "Read More"}
                      <span
                        className={`size-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-primary group-hover/btn:text-white transition-all ${isAr ? "" : "rotate-180"}`}
                      >
                        <FiArrowUpLeft className="text-lg" />
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA section (نفس الكود الخاص بك مع إضافة dir للتعامل مع اللغات) */}
        <div className="relative pt-32 pb-10" dir={isAr ? "rtl" : "ltr"}>
          {/* ... كود CTA المتبقي كما هو ... */}
        </div>
      </div>
    </section>
  );
}
