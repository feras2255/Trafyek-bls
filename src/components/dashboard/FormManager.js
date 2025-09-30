"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import FileInput from "@/components/ui/FileInput";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";

export default function FormManager({
  type,
  mode = "add",
  id = null,
  fields = [],
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  // get data by id
  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from(type === "product" ? "products" : "projects")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error(error);
          toast("فشل في جلب البيانات.");
        } else {
          setFormData(data);
        }
      };
      fetchData();
    }
  }, [mode, id, type]);

  // رفع الصورة
  const uploadImage = async (image) => {
    if (!image || typeof image === "string") return image;

    const fileName = `${Date.now()}_${image.name}`;
    const { error } = await supabase.storage.from(type).upload(fileName, image);

    if (error) {
      console.error(error);
      toast("فشل رفع الصورة.");
      return null;
    }

    const { data } = supabase.storage.from(type).getPublicUrl(fileName);
    return data.publicUrl;
  };

  // عند الحفظ
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let payload = { ...formData };

    if (formData.image) {
      const uploadedUrl = await uploadImage(formData.image);
      payload.image_url = uploadedUrl;
    }

    try {
      if (mode === "add") {
        const { error } = await supabase
          .from(type === "product" ? "products" : "projects")
          .insert([payload]);

        if (error) throw error;
        toast("تمت الإضافة بنجاح.");
      }

      if (mode === "edit" && id) {
        const { error } = await supabase
          .from(type === "product" ? "products" : "projects")
          .update(payload)
          .eq("id", id);

        if (error) throw error;
        toast("تم التحديث بنجاح.");
      }

      router.push(`/dashboard/${type}s`);
    } catch (err) {
      console.error(err);
      toast("حدث خطأ أثناء الحفظ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card p-6 rounded-lg space-y-4 mt-4"
    >
      {fields.includes("title") && (
        <Input
          type="text"
          placeholder="العنوان"
          value={formData.title || ""}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      )}

      {fields.includes("description") && (
        <Textarea
          placeholder="الوصف"
          value={formData.description || ""}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      )}

      {fields.includes("price") && (
        <Input
          type="number"
          placeholder="السعر"
          value={formData.price || ""}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
      )}

      {fields.includes("projectLink") && (
        <Input
          type="text"
          placeholder="رابط المشروع"
          value={formData.project_link || ""}
          onChange={(e) =>
            setFormData({ ...formData, project_link: e.target.value })
          }
        />
      )}

      {fields.includes("image") && (
        <FileInput
          setImage={(file) => setFormData({ ...formData, image: file })}
          initialImage={formData.image_url || ""}
        />
      )}

      <Button
        type="submit"
        title={loading ? "جاري الحفظ..." : mode === "edit" ? "تحديث" : "إضافة"}
        color="primary"
      />
    </form>
  );
}
