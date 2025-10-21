"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import Input from "@/components/ui/input";
// import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import FileInput from "@/components/ui/FileInput";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import RichTextEditor from "@/components/dashboard/rich-text-editor";

export default function EditProject() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project_link: "",
    category_id: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, title");
      if (error) console.error("Error fetching categories:", error);
      else setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleChange = (eOrHtml) => {
    // if it's input or textarea
    if (eOrHtml?.target) {
      const { name, value } = eOrHtml.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // if it's RichTextEditor
    else {
      setFormData((prev) => ({
        ...prev,
        description: eOrHtml,
      }));
    }
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
          title: data.title ?? "",
          description: data.description ?? "",
          project_link: data.project_link ?? "",
          image_url: data.image_url ?? "",
          category_id: data.category_id ?? "",
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
        title: formData.title,
        description: formData.description,
        project_link: formData.project_link,
        image_url: imageUrl,
        category_id: formData.category_id,
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
          name="title"
          placeholder="اسم المشروع"
          value={formData.title}
          onChange={handleChange}
        />

        <RichTextEditor value={formData.description} onChange={handleChange} />

        <Input
          type="text"
          name="project_link"
          placeholder="رابط المشروع"
          value={formData.project_link}
          onChange={handleChange}
        />

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">اختر التصنيف</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>

        <FileInput
          setImage={setImage}
          initialImage={formData?.image_url ?? null}
        />
        <Button
          type="submit"
          title="تحديث المشروع"
          color="secondary"
          size={"full"}
        />
      </form>
    </div>
  );
}
