"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import Input from "@/components/ui/input";
import FileInput from "@/components/ui/FileInput";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import RichTextEditor from "@/components/dashboard/rich-text-editor";
import { useLocale } from "next-intl";
import { localized } from "@/lib/localized";

export default function EditProject() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
    project_link: "",
    category_id: "",
    image_url: "",
    is_featured: false,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, title_ar, title_en")
        .order("order", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }
      setCategories(data || []);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error || !data) {
        console.error(error);
        toast.error("حدث خطأ عند جلب بيانات المشروع.");
      } else {
        setFormData({
          title_ar: data.title_ar ?? "",
          title_en: data.title_en ?? "",
          description_ar: data.description_ar ?? "",
          description_en: data.description_en ?? "",
          project_link: data.project_link ?? "",
          image_url: data.image_url ?? "",
          category_id: data.category_id ?? "",
          is_featured: data.is_featured ?? false,
        });
      }
      setFetching(false);
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!formData.category_id) {
      toast.error("من فضلك اختر تصنيف المشروع");
      return;
    }

    setLoading(true);
    let imageUrl = formData.image_url || null;

    try {
      if (image) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("projects")
          .upload(fileName, image, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("projects")
          .getPublicUrl(fileName);

        imageUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase
        .from("projects")
        .update({
          title_ar: formData.title_ar,
          title_en: formData.title_en,
          description_ar: formData.description_ar,
          description_en: formData.description_en,
          project_link: formData.project_link || null,
          image_url: imageUrl,
          category_id: formData.category_id,
          is_featured: formData.is_featured,
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("تم تحديث المشروع بنجاح.");
      router.push("/dashboard/projects");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "فشل تحديث المشروع.");
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="mt-6">
        <TitleWithBack
          title="تحديث بيانات المشروع"
          textBtn="رجوع"
          url="/dashboard/projects"
        />
        <div className="bg-card p-6 rounded-lg mt-4 animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg" />
          <div className="h-12 bg-gray-200 rounded-lg" />
          <div className="h-32 bg-gray-200 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <TitleWithBack
        title="تحديث بيانات المشروع"
        textBtn="رجوع"
        url="/dashboard/projects"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-card p-6 rounded-lg space-y-4 mt-4"
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
          name="project_link"
          placeholder="رابط المشروع"
          value={formData.project_link}
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

        <FileInput
          setImage={setImage}
          initialImage={formData?.image_url ?? null}
        />
        <button
          type="submit"
          disabled={loading}
          aria-label="تحديث المشروع"
          className="w-full bg-primary text-text py-3 rounded-lg font-bold hover:opacity-90 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "جاري التحديث..." : "تحديث المشروع"}
        </button>
      </form>
    </div>
  );
}
