import { supabase } from "@/lib/supabaseClient";
import { getLocale, getTranslations } from "next-intl/server";
import BlogForm from "../../BlogForm";
import TitleWithBack from "@/components/dashboard/TitleWithBack";

export default async function EditBlogPage({ params }) {
  const { id } = await params;
  const t = await getTranslations("dashboard");
  const locale = await getLocale();

  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .single();

  return (
    <div className="container mx-auto px-4 ">
      <TitleWithBack
        title={locale === "ar" ? "تعديل المقال" : "Edit Blog"}
        textBtn={t("back")}
        url="/dashboard/blogs"
      />
      {/* BlogForm component */}
      <BlogForm initialData={blog} isAr={locale === "ar"} />
    </div>
  );
}
