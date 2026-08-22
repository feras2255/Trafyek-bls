"use client";
import { useEffect, useState } from "react";
import Input from "@/components/ui/input";
import { toast } from "sonner";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import FileInput from "@/components/ui/FileInput";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "@/i18n/navigation";
import RichTextEditor from "@/components/dashboard/rich-text-editor";
import { useLocale } from "next-intl";
import { localized } from "@/lib/localized";

const EMPTY_FORM = {
  title_ar: "",
  title_en: "",
  description_ar: "",
  description_en: "",
  projectLink: "",
  category_id: "",
  is_featured: false,
};

export default function AddProject() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, title_ar, title_en")
        .order("order", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
        toast.error("فشل جلب التصنيفات");
        return;
      }
      setCategories(data || []);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadImage = async () => {
    if (!image) return null;

    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("projects")
      .upload(fileName, image, { cacheControl: "3600" });

    // فشل رفع الصورة يجب أن يوقف الحفظ لا أن يمر بصمت
    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from("projects").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!formData.category_id) {
      toast.error("من فضلك اختر تصنيف المشروع");
      return;
    }

    setLoading(true);

    try {
      const { data: lastProject } = await supabase
        .from("projects")
        .select("order")
        .order("order", { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextOrder = (lastProject?.order || 0) + 1;
      const imageUrl = await uploadImage();

      const { error } = await supabase.from("projects").insert({
        title_ar: formData.title_ar,
        title_en: formData.title_en,
        description_ar: formData.description_ar,
        description_en: formData.description_en,
        project_link: formData.projectLink || null,
        image_url: imageUrl,
        category_id: formData.category_id,
        order: nextOrder,
        is_featured: formData.is_featured,
      });

      if (error) throw error;

      toast.success("تم إضافة المشروع بنجاح");
      router.push("/dashboard/projects");
    } catch (err) {
      console.error("Error inserting project:", err);
      toast.error(err?.message || "حدث خطأ أثناء إضافة المشروع");
      setLoading(false);
    }
  };

  return (
    <div>
      <TitleWithBack
        title="إضافة مشروع جديد"
        textBtn="رجوع"
        url="/dashboard/projects"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-card p-6 rounded-lg space-y-4"
      >
        <Input
          type="text"
          name="title_ar"
          placeholder="اسم المشروع بالعربية"
          value={formData.title_ar}
          onChange={handleChange}
          required
        />

        <Input
          type="text"
          name="title_en"
          placeholder="Project title in English"
          value={formData.title_en}
          onChange={handleChange}
        />

        <div className="space-y-2">
          <label className="font-bold">الوصف العربي</label>
          <RichTextEditor
            value={formData.description_ar}
            onChange={(html) =>
              setFormData((prev) => ({ ...prev, description_ar: html }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="font-bold">الوصف الإنجليزي</label>
          <RichTextEditor
            value={formData.description_en}
            onChange={(html) =>
              setFormData((prev) => ({ ...prev, description_en: html }))
            }
          />
        </div>

        <Input
          type="url"
          name="projectLink"
          placeholder="رابط المشروع"
          value={formData.projectLink}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_featured"
            checked={formData.is_featured}
            onChange={handleChange}
          />
          مشروع مميز
        </label>

        <div className="flex flex-col">
          <label htmlFor="category_id" className="text-maintext font-semibold">
            التصنيف
          </label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="w-full border border-border rounded-lg p-3 mt-2 bg-card"
          >
            <option value="">اختر التصنيف</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {localized(cat, "title", isAr)}
              </option>
            ))}
          </select>
        </div>

        <FileInput setImage={setImage} />
        <button
          type="submit"
          disabled={loading}
          aria-label="إضافة المشروع"
          className="w-full bg-primary text-text py-3 rounded-lg font-bold hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "جاري الإضافة..." : "إضافة المشروع"}
        </button>
      </form>
    </div>
  );
}
