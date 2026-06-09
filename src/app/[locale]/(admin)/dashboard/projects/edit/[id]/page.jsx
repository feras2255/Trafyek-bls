"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import Input from "@/components/ui/input";
import FileInput from "@/components/ui/FileInput";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import RichTextEditor from "@/components/dashboard/rich-text-editor";
import { useLocale } from "next-intl";

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

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, title_ar, title_en");
      if (error) console.error("Error fetching categories:", error);
      else setCategories(data);
    };
    fetchCategories();
  }, []);

  // const handleChange = (eOrHtml) => {
  //   // if it's input or textarea
  //   if (eOrHtml?.target) {
  //     const { name, value } = eOrHtml.target;
  //     setFormData((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  //   // if it's RichTextEditor
  //   else {
  //     setFormData((prev) => ({
  //       ...prev,
  //       description: eOrHtml,
  //     }));
  //   }
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        toast("حدث خطأ عند جلب بيانات المشروع.");
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
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formData.image_url || "";

    if (image) {
      try {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from("projects")
          .upload(filePath, image, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("projects")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      } catch (err) {
        console.error("Upload error:", err);
        toast("فشل تحميل الصورة.");
        return;
      }
    }

    const { error } = await supabase
      .from("projects")
      .update({
        title_ar: formData.title_ar,
        title_en: formData.title_en,
        description_ar: formData.description_ar,
        description_en: formData.description_en,
        project_link: formData.project_link,
        image_url: imageUrl,
        category_id: Number(formData.category_id),
        is_featured: formData.is_featured,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      toast("فشل تحديث المشروع.");
    } else {
      toast("تم تحديث المشروع بنجاح.");
      router.push("/dashboard/projects");
    }
  };

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
        />

        <Input
          type="text"
          name="title_en"
          placeholder="Project title in English"
          value={formData.title_en}
          onChange={handleChange}
        />

        {/* <RichTextEditor value={formData.description} onChange={handleChange} /> */}

        <div className="space-y-2">
          <label className="font-bold">الوصف العربي</label>

          <RichTextEditor
            value={formData.description_ar}
            onChange={(html) =>
              setFormData((prev) => ({
                ...prev,
                description_ar: html,
              }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="font-bold">الوصف الإنجليزي</label>

          <RichTextEditor
            value={formData.description_en}
            onChange={(html) =>
              setFormData((prev) => ({
                ...prev,
                description_en: html,
              }))
            }
          />
        </div>

        <Input
          type="text"
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
        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">اختر التصنيف</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {" "}
              {isAr ? cat.title_ar : cat.title_en}{" "}
            </option>
          ))}
        </select>

        <FileInput
          setImage={setImage}
          initialImage={formData?.image_url ?? null}
        />
        <button
          type="submit"
          className="w-full bg-primary text-text py-3 rounded-lg font-bold hover:opacity-90 transition-all cursor-pointer"
        >
          إضافة المشروع
        </button>
      </form>
    </div>
  );
}
