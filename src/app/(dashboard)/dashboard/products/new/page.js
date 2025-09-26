"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import FileInput from "@/components/ui/FileInput";

export default function NewProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (image) {
      const fileExt = image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
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
        title,
        description,
        price,
        category,
        image_url: imageUrl,
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

        <FileInput setImage={setImage} />

        <Button title="حفظ" color="primary" type="submit" />
      </form>
    </div>
  );
}
