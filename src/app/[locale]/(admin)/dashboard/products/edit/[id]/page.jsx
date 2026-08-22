"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { supabase } from "@/lib/supabaseClient";
import FileInput from "@/components/ui/FileInput";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import Input from "@/components/ui/input";
import { toast } from "sonner";
import RichTextEditor from "@/components/dashboard/rich-text-editor";
import { localized } from "@/lib/localized";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const locale = useLocale();
  const isAr = locale === "ar";
  const id = params?.id;

  const [formData, setFormData] = useState({
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
    price: "",
    category_id: "",
    image_url: "",
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setField = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error || !data) {
        console.error(error);
        toast.error("تعذّر جلب بيانات المنتج");
        setFetching(false);
        return;
      }

      setFormData({
        title_ar: data.title_ar ?? "",
        title_en: data.title_en ?? "",
        description_ar: data.description_ar ?? "",
        description_en: data.description_en ?? "",
        price: data.price ?? "",
        category_id: data.category_id ?? "",
        image_url: data.image_url ?? "",
      });
      setFetching(false);
    };

    fetchProduct();
  }, [id]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    let imageUrl = formData.image_url || null;

    try {
      if (image) {
        const fileExt = image.name.split(".").pop();
        const filePath = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(filePath, image, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("products")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase
        .from("products")
        .update({
          title_ar: formData.title_ar.trim(),
          title_en: formData.title_en.trim() || null,
          description_ar: formData.description_ar,
          description_en: formData.description_en,
          price: formData.price === "" ? null : Number(formData.price),
          category_id:
            formData.category_id === "" ? null : formData.category_id,
          image_url: imageUrl,
        })
        .eq("id", id);

      if (error) throw error;

      toast.success("تم تحديث المنتج بنجاح");
      router.push("/dashboard/products");
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "فشل تحديث المنتج");
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-6">
        <TitleWithBack
          title="تحديث المنتج"
          textBtn="رجوع"
          url="/dashboard/products"
        />
        <div className="bg-card shadow rounded p-6 space-y-4 animate-pulse">
          <div className="h-12 bg-gray-200 rounded" />
          <div className="h-32 bg-gray-200 rounded" />
          <div className="h-12 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <TitleWithBack
        title="تحديث المنتج"
        textBtn="رجوع"
        url="/dashboard/products"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-card shadow rounded p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="title_ar"
            type="text"
            placeholder="العنوان بالعربية"
            value={formData.title_ar}
            onChange={handleChange}
            required
          />
          <Input
            name="title_en"
            type="text"
            placeholder="Title in English"
            value={formData.title_en}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <label className="text-maintext font-semibold">الوصف بالعربية</label>
          <RichTextEditor
            value={formData.description_ar}
            onChange={(html) => setField("description_ar", html)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-maintext font-semibold">
            Description in English
          </label>
          <RichTextEditor
            value={formData.description_en}
            onChange={(html) => setField("description_en", html)}
          />
        </div>

        <Input
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="السعر"
          value={formData.price}
          onChange={handleChange}
        />

        <div className="flex flex-col">
          <label htmlFor="category_id" className="text-maintext font-semibold">
            التصنيف
          </label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="bg-card text-maintext w-full border border-border rounded-md p-2 mt-2 outline-none"
          >
            <option value="">اختر التصنيف</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {localized(cat, "title", isAr)}
              </option>
            ))}
          </select>
        </div>

        <FileInput setImage={setImage} initialImage={formData.image_url} />

        <button
          type="submit"
          aria-label="حفظ التغييرات"
          className="bg-fourth text-white w-full px-4 py-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
        </button>
      </form>
    </div>
  );
}
