"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import Dialog from "./Dialog";
import Input from "../ui/input";
import FileInput from "../ui/FileInput";

export default function AddCategory({
  onAdded,
  categoryToEdit = null,
  onClose,
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoryToEdit) {
      setTitle(categoryToEdit.title || "");
      setDescription(categoryToEdit.description || "");
      setOpen(true);
    }
  }, [categoryToEdit]);

  const extractFilePath = (url) => {
    try {
      const parts = url.split("/storage/v1/object/public/categories/");
      return parts[1];
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = categoryToEdit?.image_url || "";

    if (image) {
      if (categoryToEdit?.image_url) {
        const oldPath = extractFilePath(categoryToEdit.image_url);
        if (oldPath) {
          await supabase.storage.from("categories").remove([oldPath]);
        }
      }

      const fileExt = image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("categories")
        .upload(filePath, image);

      if (uploadError) {
        toast.error("فشل رفع الصورة: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: publicData } = supabase.storage
        .from("categories")
        .getPublicUrl(filePath);

      imageUrl = publicData.publicUrl;
    }

    let data, error;

    if (categoryToEdit) {
      // update
      ({ data, error } = await supabase
        .from("categories")
        .update({ title, description, image_url: imageUrl })
        .eq("id", categoryToEdit.id)
        .select()
        .single());
    } else {
      // insert
      const { data: lastCategory } = await supabase
        .from("categories")
        .select("order")
        .order("order", { ascending: false })
        .limit(1)
        .single();

      const nextOrder = lastCategory ? lastCategory.order + 1 : 1;

      ({ data, error } = await supabase
        .from("categories")
        .insert([{ title, image_url: imageUrl, order: nextOrder }])
        .select()
        .single());
    }

    setLoading(false);

    if (error) {
      toast.error("فشل العملية: " + error.message);
    } else {
      toast.success(categoryToEdit ? "تم تحديث التصنيف" : "تم إضافة التصنيف");
      setTitle("");
      setImage(null);
      setOpen(false);
      onAdded?.(data);
      onClose?.();
    }
  };

  return (
    <div>
      {!categoryToEdit && (
        <button
          className="rounded bg-secondary px-4 py-2 text-maintext cursor-pointer"
          onClick={() => setOpen(true)}
        >
          + إضافة تصنيف
        </button>
      )}

      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          onClose?.();
        }}
        title={categoryToEdit ? "تعديل التصنيف" : "إضافة تصنيف"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="title"
            placeholder="أدخل اسم التصنيف"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="text"
            name="description"
            placeholder="ادخل وصف التصنيف"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FileInput setImage={setImage} />
          <button
            type="submit"
            className="rounded bg-secondary px-4 py-2 text-white w-full cursor-pointer"
            disabled={loading}
          >
            {loading
              ? "جاري الحفظ..."
              : categoryToEdit
              ? "تحديث التصنيف"
              : "إضافة تصنيف"}
          </button>
        </form>
      </Dialog>
    </div>
  );
}
