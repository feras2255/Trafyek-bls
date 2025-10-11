"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import FileInput from "@/components/ui/FileInput";
import RichTextEditor from "@/components/dashboard/rich-text-editor";

export default function NewProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);
  const router = useRouter();

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: existingProducts, error: orderError } = await supabase
      .from("products")
      .select("order")
      .order("order", { ascending: false })
      .limit(1);

    let nextOrder = 1;
    if (!orderError && existingProducts.length > 0) {
      nextOrder = (existingProducts[0].order || 0) + 1;
    }

    let imageUrl = "";
    if (image) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, image, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        return;
      }

      // Get the public URL
      const { data: publicUrlData } = supabase.storage
        .from("products")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData.publicUrl;
    }

    // Insert the new product
    const { error } = await supabase.from("products").insert([
      {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        category_id: formData.category,
        image_url: imageUrl,
        order: nextOrder,
      },
    ]);

    if (error) {
      console.error("Insert error:", error.message);
    } else {
      router.push("/dashboard/products");
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
        <Input
          name="title"
          type="text"
          placeholder="العنوان"
          value={formData.title}
          onChange={handleChange}
        />

        <RichTextEditor onChange={handleChange} />

        <Input
          name="price"
          type="number"
          placeholder="السعر"
          value={formData.price}
          onChange={handleChange}
        />

        <select
          name="category"
          className="w-full border rounded-md p-2 bg-card text-secondarytext"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">اختر التصنيف</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>

        <FileInput setImage={setImage} />

        <Button title="حفظ" color="secondary" type="submit" size={"full"} />
      </form>
    </div>
  );
}
