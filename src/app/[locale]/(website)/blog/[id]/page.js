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

export default async function BlogPostPage({ params }) {
  const { id } = await params;
  const locale = await getLocale();
  const isAr = locale === "ar";

  // جلب بيانات المقال من Supabase
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
      {/* Header / Hero Section */}
      <header className="relative h-[80vh] md:h-[90vh] w-full">
        <Image
          src={post.image_url || "/he.png"}
          alt={title}
          fill
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

              <h1 className="text-3xl md:text-6xl font-black text-white leading-tight">
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
        <div className="bg-card rounded-[3rem] py-8 px-2 md:p-16 shadow-2xl shadow-black/5 border border-slate-50">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <span className="bg-primary text-text px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {category}
              </span>
              <span className="bg-primary text-text px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {isAr ? "مقالات" : "Blogs"}
              </span>
              <span className="bg-primary text-text px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {isAr ? "ترافيك بلس" : "Traffic Blog"}
              </span>
            </div>
          </div>
          {/* Rich Text Content */}
          <div
            className="prose prose-lg md:prose-xl max-w-none prose-slate prose-headings:font-black prose-headings:text-accent prose-p:leading-relaxed prose-img:rounded-3xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Footer of the article */}
          <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <h4 className="font-bold text-accent">
                {isAr ? "شارك المقال:" : "Share:"}
              </h4>
              <div className="flex gap-2">
                {/* أزرار المشاركة - يمكن تفعيلها لاحقاً */}
                <div className="size-10 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all">
                  FB
                </div>
                <div className="size-10 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all">
                  TW
                </div>
                <div className="size-10 rounded-full bg-slate-50 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all">
                  LN
                </div>
              </div>
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
