import { supabase } from "@/lib/supabaseClient";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import DeleteButton from "./components/DeleteButton";

export default async function BlogsPage() {
  const locale = await getLocale();
  const isAr = locale === "ar";

  const { data: blogs, error } = await supabase
    .from("blogs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className={`p-6 text-red-500 ${isAr ? "text-right" : "text-left"}`}>
        {isAr ? "حدث خطأ أثناء تحميل المقالات:" : "Error loading blogs:"}{" "}
        {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50/50" dir={isAr ? "rtl" : "ltr"}>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {isAr ? "إدارة المقالات" : "Manage Blogs"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {isAr
              ? "عرض وتعديل كافة المقالات المنشورة"
              : "View and edit all published articles"}
          </p>
        </div>
        <Link
          href="blogs/new"
          className="bg-primary text-white px-6 py-2.5 rounded-xl flex items-center gap-2"
        >
          <span>+</span> {isAr ? "إضافة مقال جديد" : "Add New Blog"}
        </Link>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.map((blog) => (
          <div
            key={blog.id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Blog Image Container */}
            <div className="relative h-52 bg-gray-100 overflow-hidden">
              {blog.image_url ? (
                <Image
                  src={blog.image_url}
                  alt={isAr ? blog.title_ar : blog.title_en}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                  <svg
                    className="w-10 h-10 opacity-20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span className="text-xs">
                    {isAr ? "لا توجد صورة" : "No image"}
                  </span>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                  {isAr ? blog.category_ar : blog.category_en}
                </span>
                <span className="text-[11px] text-gray-400">
                  {new Date(blog.created_at).toLocaleDateString(
                    isAr ? "ar-EG" : "en-US",
                  )}
                </span>
              </div>

              <h2 className="text-lg font-bold text-gray-800 line-clamp-1 mb-2">
                {isAr ? blog.title_ar : blog.title_en}
              </h2>

              <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4 flex-grow">
                {isAr ? blog.description_ar : blog.description_en}
              </p>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                <Link
                  href={`blogs/${blog.id}/edit`}
                  className="flex-1 text-center text-sm font-medium py-2 rounded-lg text-text bg-accent hover:bg-accent/90 transition-colors"
                >
                  {isAr ? "تعديل" : "Edit"}
                </Link>
                <DeleteButton id={blog.id} isAr={isAr} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
