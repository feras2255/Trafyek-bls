// src/app/(dashboard)/dashboard/products/edit/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import FileInput from "@/components/ui/FileInput";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { toast } from "sonner";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
      setTitle(data.title ?? "");
      setDescription(data.description ?? "");
      setPrice(data.price ?? "");
      setCategory(data.category ?? "");
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-6">جاري التحميل...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = product.image_url || "";

    if (image) {
      try {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = fileName;

        const { data: uploadData, error: uploadError } = await supabase.storage
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
      .update({ title, description, price, category, image_url: imageUrl })
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
          type="text"
          placeholder="العنوان"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Textarea
          placeholder="الوصف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Input
          type="number"
          placeholder="السعر"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          type="text"
          placeholder="التصنيف"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <FileInput setImage={setImage} initialImage={product.image_url} />

        <div>
          <button
            type="submit"
            className="bg-yellow-600 text-white px-4 py-2 rounded cursor-pointer"
            disabled={loading}
          >
            {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>
        </div>
      </form>
    </div>
  );
}
