"use client";
import { useEffect, useState } from "react";
import Input from "@/components/ui/input";
import { toast } from "sonner";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import FileInput from "@/components/ui/FileInput";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/dashboard/rich-text-editor";
import { useLocale } from "next-intl";

export default function AddProject() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
    projectLink: "",
    category_id: "",
    is_featured: false,
  });
  const [image, setImage] = useState(null);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, title_ar, title_en");
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }
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

  // upload image to supabase storage

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const uploadImage = async () => {
    if (!image) return null;

    const fileName = `${Date.now()}_${image.name}`;

    // upload image
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("projects")
      .upload(fileName, image);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return null;
    }

    // get public url
    const { data } = supabase.storage.from("projects").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("HANDLE SUBMIT FIRED");

    const { data: existingProjects, error: orderError } = await supabase
      .from("projects")
      .select("order")
      .order("order", { ascending: false })
      .limit(1);

    let nextOrder = 1;
    if (!orderError && existingProjects.length > 0) {
      nextOrder = (existingProjects[0].order || 0) + 1;
    }

    const imageUrl = await uploadImage();

    const { error } = await supabase
      .from("projects")
      .insert({
        title_ar: formData.title_ar,
        title_en: formData.title_en,
        description_ar: formData.description_ar,
        description_en: formData.description_en,
        project_link: formData.projectLink,
        image_url: imageUrl,
        category_id: Number(formData.category_id),
        order: nextOrder,
        is_featured: formData.is_featured,
      })
      .select();

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      console.error("Error inserting project:", error);
      toast.error("حدث خطأ أثناء إضافة المشروع");
    } else {
      toast.success("تم إضافة المشروع بنجاح");
      router.push("/dashboard/projects");
    }

    setFormData({
      title_ar: "",
      title_en: "",
      description_ar: "",
      description_en: "",
      projectLink: "",
      category_id: "",
      is_featured: false,
    });
    setImage(null);
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
        />

        <Input
          type="text"
          name="title_en"
          placeholder="Project title in English"
          value={formData.title_en}
          onChange={handleChange}
        />

        {/* <RichTextEditor onChange={handleChange} /> */}

        <div className="space-y-2">
          <label className="font-bold">الوصف العربي</label>
          <RichTextEditor
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

        <FileInput setImage={setImage} />
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
