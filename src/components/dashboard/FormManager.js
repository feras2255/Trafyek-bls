"use client";
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import Input from "@/components/ui/input";
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
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(mode === "edit");

  useEffect(() => {
    if (mode !== "edit" || !id) return;

    const fetchData = async () => {
      const { data, error } = await supabase
        .from(type)
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error || !data) {
        console.error(error);
        toast.error("فشل في جلب البيانات.");
      } else {
        setFormData(data);
      }
      setFetching(false);
    };

    fetchData();
  }, [mode, id, type]);

  const uploadImage = async (image) => {
    const fileExt = image.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    const { error } = await supabase.storage
      .from(type)
      .upload(fileName, image, { cacheControl: "3600" });

    if (error) throw error;

    const { data } = supabase.storage.from(type).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      // نستبعد الأعمدة التي تديرها قاعدة البيانات
      const { id: _id, created_at, updated_at, ...payload } = formData;

      if (imageFile) payload.image_url = await uploadImage(imageFile);

      if (payload.order === "" || payload.order === undefined)
        delete payload.order;
      else payload.order = Number(payload.order);

      if (mode === "add") {
        // ترتيب تلقائي في نهاية القائمة
        if (payload.order === undefined) {
          const { data: last } = await supabase
            .from(type)
            .select("order")
            .order("order", { ascending: false })
            .limit(1)
            .maybeSingle();
          payload.order = (last?.order || 0) + 1;
        }

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
      console.error(err);
      toast.error(err?.message || "حدث خطأ أثناء الحفظ.");
      setLoading(false);
    }
  };

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (fetching) {
    return (
      <div className="p-6 space-y-4 animate-pulse">
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-12 bg-gray-200 rounded" />
        <div className="h-40 bg-gray-200 rounded" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-6">
        {fields.includes("title") && (
          <>
            <Input
              name="title_ar"
              placeholder={t("title_ar")}
              value={formData.title_ar || ""}
              onChange={(e) => handleFieldChange("title_ar", e.target.value)}
              required
            />
            <Input
              name="title_en"
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
              name="description_ar"
              placeholder={t("description_ar")}
              value={formData.description_ar || ""}
              onChange={(e) =>
                handleFieldChange("description_ar", e.target.value)
              }
            />
            <Textarea
              name="description_en"
              placeholder={t("description_en")}
              value={formData.description_en || ""}
              onChange={(e) =>
                handleFieldChange("description_en", e.target.value)
              }
            />
          </>
        )}
        {fields.includes("order") && (
          <Input
            name="order"
            type="number"
            min="1"
            placeholder="الترتيب"
            value={formData.order ?? ""}
            onChange={(e) => handleFieldChange("order", e.target.value)}
          />
        )}
      </div>

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

      {fields.includes("image") && (
        <div className="pt-4">
          <label className="block mb-2 text-sm font-bold text-maintext">
            الصورة
          </label>
          <FileInput setImage={setImageFile} initialImage={formData.image_url} />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        aria-label={mode === "edit" ? "تحديث البيانات" : "إضافة"}
        className="bg-primary text-text text-xl font-bold py-4 w-full rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading
          ? "جاري الحفظ..."
          : mode === "edit"
            ? "تحديث البيانات"
            : "إضافة"}
      </button>
    </form>
  );
}
