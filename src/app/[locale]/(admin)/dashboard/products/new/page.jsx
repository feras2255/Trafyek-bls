"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import Input from "@/components/ui/input";
import FileInput from "@/components/ui/FileInput";
import RichTextEditor from "@/components/dashboard/rich-text-editor";
import { localized } from "@/lib/localized";

export default function NewProduct() {
  const router = useRouter();
  const locale = useLocale();
  const isAr = locale === "ar";

  const [formData, setFormData] = useState({
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
    price: "",
    category_id: "",
  });
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setField = (name, value) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!formData.title_ar.trim()) {
      toast.error("من فضلك أدخل عنوان المنتج بالعربية");
      return;
    }

    setLoading(true);

    try {
      const { data: lastProduct } = await supabase
        .from("products")
        .select("order")
        .order("order", { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextOrder = (lastProduct?.order || 0) + 1;

      let imageUrl = null;
      if (image) {
        const fileExt = image.name.split(".").pop();
        const filePath = `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(filePath, image, { cacheControl: "3600", upsert: false });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("products")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase.from("products").insert([
        {
          title_ar: formData.title_ar.trim(),
          title_en: formData.title_en.trim() || null,
          description_ar: formData.description_ar,
          description_en: formData.description_en,
          // الحقول الرقمية والمفاتيح الأجنبية الفارغة تُرسل null وليس ""
          price: formData.price === "" ? null : Number(formData.price),
          category_id:
            formData.category_id === "" ? null : formData.category_id,
          image_url: imageUrl,
          order: nextOrder,
        },
      ]);

      if (error) throw error;

      toast.success("تم إضافة المنتج بنجاح");
      router.push("/dashboard/products");
    } catch (err) {
      console.error("Insert error:", err);
      toast.error(err?.message || "حدث خطأ أثناء إضافة المنتج");
      setLoading(false);
    }
  };

  return (
    <div>
      <TitleWithBack
        title="إضافة منتج جديد"
        textBtn="رجوع"
        url="/dashboard/products"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-card shadow rounded-md p-6 space-y-4"
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
            className="w-full border border-border rounded-md p-2 mt-2 bg-card text-secondarytext"
            value={formData.category_id}
            onChange={handleChange}
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
          aria-label="حفظ المنتج"
          className="bg-fourth text-text w-full py-3 rounded font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "جاري الحفظ..." : "حفظ"}
        </button>
      </form>
    </div>
  );
}
