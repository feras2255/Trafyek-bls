import { getLocale, getTranslations } from "next-intl/server";
import BlogForm from "../BlogForm";
import TitleWithBack from "@/components/dashboard/TitleWithBack";

export default async function NewBlogPage() {
  const t = await getTranslations("dashboard");
  const locale = await getLocale();
  const isAr = locale === "ar";

  return (
    <div className="container mx-auto px-4 ">
      <TitleWithBack
        title={locale === "ar" ? "اضافة المقال" : "Add Blog"}
        textBtn={t("back")}
        url="/dashboard/blogs"
      />

      <BlogForm initialData={null} isAr={isAr} />
    </div>
  );
}
