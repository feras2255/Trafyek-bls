import PageHero from "@/components/ui/PageHero";
import Pagination from "@/components/ui/Pagination";
import { getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";
import { FiArrowUpLeft, FiClock, FiTag } from "react-icons/fi";

export default async function Blog({ searchParams }) {
  const locale = await getLocale();
  const isAr = locale === "ar";

  const params = await searchParams;
  const page = Number(params?.page || 1);
  const limit = 8;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const {
    data: blogs,
    count,
    error,
  } = await supabase
    .from("blogs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error(error);
  }

  const totalPages = Math.ceil((count || 0) / limit);

  const breadcrumb = [
    {
      label: isAr ? "المدونة" : "Blog",
      href: null,
    },
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(isAr ? "ar-EG" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="pb-24 bg-[#fcfcfd]">
      <PageHero
        title={isAr ? "مدونة ترافيك بلس" : "Traffic Plus Blog"}
        description={
          isAr
            ? "مقالات تقنية وتسويقية متخصصة."
            : "Technical and marketing articles."
        }
        breadcrumbData={breadcrumb}
        isAr={isAr}
        showButtons
      />

      <div className="container mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {blogs?.map((post) => (
            <article
              key={post.id}
              dir={isAr ? "rtl" : "ltr"}
              className="
                group
                bg-white
                rounded-2xl
                overflow-hidden
                border
                border-border
                shadow-sm
                hover:-translate-y-2
                transition-all
                duration-500
              "
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image_url || "/he.png"}
                  alt={isAr ? post.title_ar : post.title_en}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <span
                  className={`absolute top-5 ${
                    isAr ? "right-5" : "left-5"
                  } bg-white/95 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-primary flex items-center gap-2`}
                >
                  <FiTag />
                  {isAr
                    ? post.category_ar || "عام"
                    : post.category_en || "General"}
                </span>
              </div>

              <div className="py-6 px-3">
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                  <FiClock />
                  {formatDate(post.created_at)}
                </div>

                <h2 className="text-base md:text-xl font-extrabold text-slate-900 line-clamp-2 mb-3">
                  {isAr ? post.title_ar : post.title_en}
                </h2>

                <div
                  className="text-slate-600 text-xs md:text-sm leading-7 line-clamp-3"
                  dangerouslySetInnerHTML={{
                    __html: isAr ? post.description_ar : post.description_en,
                  }}
                />

                <Link
                  href={`/${locale}/blogs/${post.id}`}
                  className="inline-flex items-center gap-3 mt-6 font-bold text-primary"
                >
                  {isAr ? "اقرأ المزيد" : "Read More"}

                  <span
                    className={`w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center transition-all group-hover:bg-primary group-hover:text-white ${
                      !isAr ? "rotate-180" : ""
                    }`}
                  >
                    <FiArrowUpLeft />
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={page}
          locale={locale}
          isAr={isAr}
        />
      </div>
    </section>
  );
}
