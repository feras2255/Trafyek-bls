"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import FileInput from "@/components/ui/FileInput";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import Input from "@/components/ui/input";
import { toast } from "sonner";
import RichTextEditor from "@/components/dashboard/rich-text-editor";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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

  // fetch product
  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        return;
      }
      setProduct(data);
      setFormData({
        title: data.title ?? "",
        description: data.description ?? "",
        price: data.price ?? "",
        category_id: data.category_id ?? "",
        image_url: data.image_url ?? "",
      });
    };
    fetchProduct();
  }, [id]);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        console.error("Error fetching categories:", error.message);
      } else {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = formData.image_url || "";

    if (image) {
      try {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(filePath, image, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("products")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      } catch (err) {
        console.error("Upload error:", err);
        toast("فشل تحميل الصورة.");
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase
      .from("products")
      .update({
        ...formData,
        image_url: imageUrl,
      })
      .eq("id", id);

    setLoading(false);
    if (error) {
      console.error(error);
      toast("فشل تحديث المنتج.");
    } else {
      router.push("/dashboard/products");
    }
  };

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
        <Input
          name="title"
          type="text"
          placeholder="العنوان"
          value={formData.title}
          onChange={handleChange}
        />

        <RichTextEditor value={formData.description} onChange={handleChange} />

        <Input
          name="price"
          type="number"
          placeholder="السعر"
          value={formData.price}
          onChange={handleChange}
        />

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="bg-card text-maintext w-full border rounded-md p-2 outline-none "
        >
          <option value="">اختر التصنيف</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>

        <FileInput setImage={setImage} initialImage={product?.image_url} />

        <div>
          <button
            type="submit"
            aria-label="حفظ التغييرات"
            className="bg-fourth text-white w-full px-4 py-2 rounded cursor-pointer"
            disabled={loading}
          >
            {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>
        </div>
      </form>
    </div>
  );
}
