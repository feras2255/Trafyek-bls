"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import ButtonSubmit from "@/components/ui/ButtonSubmit";
import FileInput from "@/components/ui/FileInput";
import RichTextEditor from "@/components/dashboard/rich-text-editor";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import Textarea from "../ui/textarea";

export default function FormManager({
  type,
  mode = "add",
  id = null,
  fields = [],
}) {
  const t = useTranslations("dashboard");
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && id) {
      const fetchData = async () => {
        const { data, error } = await supabase
          .from(type)
          .select("*")
          .eq("id", id)
          .single();

        if (error) toast.error("فشل في جلب البيانات.");
        else setFormData(data);
      };
      fetchData();
    }
  }, [mode, id, type]);

  // upload image
  const uploadImage = async (image) => {
    if (!image || typeof image === "string") return image;
    const fileName = `${Date.now()}_${image.name}`;
    const { error } = await supabase.storage.from(type).upload(fileName, image);
    if (error) {
      toast.error("فشل رفع الصورة.");
      return null;
    }
    const { data } = supabase.storage.from(type).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let payload = { ...formData };

    // upload image
    if (formData.image_file) {
      const uploadedUrl = await uploadImage(formData.image_file);
      if (uploadedUrl) payload.image_url = uploadedUrl;
      delete payload.image_file;
    }

    try {
      if (mode === "add") {
        const { error } = await supabase.from(type).insert([payload]);
        if (error) throw error;
        toast.success("تمت الإضافة بنجاح.");
      } else {
        const { error } = await supabase
          .from(type)
          .update(payload)
          .eq("id", id);
        if (error) throw error;
        toast.success("تم التحديث بنجاح.");
      }
      router.push(`/dashboard/${type}`);
    } catch (err) {
      toast.error("حدث خطأ أثناء الحفظ.");
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6">
        {fields.includes("title") && (
          <>
            <Input
              placeholder={t("title_ar")}
              value={formData.title_ar || ""}
              onChange={(e) => handleFieldChange("title_ar", e.target.value)}
              required
            />
            <Input
              placeholder={t("title_en")}
              value={formData.title_en || ""}
              onChange={(e) => handleFieldChange("title_en", e.target.value)}
              required
            />
          </>
        )}
        {fields.includes("description") && (
          <>
            <Textarea
              placeholder={t("description_ar")}
              value={formData.description_ar || ""}
              onChange={(e) =>
                handleFieldChange("description_ar", e.target.value)
              }
            />
            <Textarea
              placeholder={t("description_en")}
              value={formData.description_en || ""}
              onChange={(e) =>
                handleFieldChange("description_en", e.target.value)
              }
            />
          </>
        )}
      </div>

      {/* description long */}
      {fields.includes("long_description") && (
        <div className="space-y-8">
          <div>
            <label className="block mb-2 font-bold text-maintext">
              {t("long_description_ar")}
            </label>
            <RichTextEditor
              value={formData.long_description_ar || ""}
              onChange={(val) => handleFieldChange("long_description_ar", val)}
            />
          </div>
          <div>
            <label className="block mb-2 font-bold text-maintext">
              {t("long_description_en")}
            </label>
            <RichTextEditor
              value={formData.long_description_en || ""}
              onChange={(val) => handleFieldChange("long_description_en", val)}
            />
          </div>
        </div>
      )}

      {/* image */}
      {fields.includes("image") && (
        <div className="pt-4">
          <label className="block mb-2 text-sm font-bold text-maintext">
            صورة التصنيف
          </label>
          <FileInput
            setImage={(file) => handleFieldChange("image_file", file)}
            initialImage={formData.image_url}
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-text text-xl font-bold py-4 w-full rounded-lg cursor-pointer"
      >
        {mode === "edit" ? "تحديث البيانات" : "إضافة التصنيف"}
      </button>
    </form>
  );
}
