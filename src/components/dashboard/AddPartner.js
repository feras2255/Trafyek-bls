"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import Dialog from "./Dialog";
import FileInput from "../ui/FileInput";
import Input from "../ui/input";

export default function AddPartner({ onAdded, partnerToEdit = null, onClose }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpen(true);
    if (partnerToEdit) {
      setOrder(partnerToEdit.order || 0);
    }
  }, [partnerToEdit]);

  const extractFilePath = (url) => {
    try {
      const parts = url.split("/storage/v1/object/public/partners/");
      return parts[1];
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = partnerToEdit?.image_url || "";

    // ✅ رفع الصورة الجديدة
    if (image) {
      if (partnerToEdit?.image_url) {
        const oldPath = extractFilePath(partnerToEdit.image_url);
        if (oldPath) await supabase.storage.from("partners").remove([oldPath]);
      }

      const fileExt = image.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("partners")
        .upload(filePath, image);

      if (uploadError) {
        toast.error("فشل رفع الصورة: " + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: publicData } = supabase.storage
        .from("partners")
        .getPublicUrl(filePath);

      imageUrl = publicData.publicUrl;
    }

    let error;

    if (partnerToEdit) {
      const { error: updateError } = await supabase
        .from("partners")
        .update({ image_url: imageUrl, order })
        .eq("id", partnerToEdit.id);
      error = updateError;
    } else {
      const { data: lastPartner } = await supabase
        .from("partners")
        .select("order")
        .order("order", { ascending: false })
        .limit(1)
        .maybeSingle();

      const nextOrder = lastPartner ? lastPartner.order + 1 : 1;

      const { error: insertError } = await supabase
        .from("partners")
        .insert([{ image_url: imageUrl, order: nextOrder }]);
      error = insertError;
    }

    setLoading(false);

    if (error) {
      toast.error("فشل العملية: " + error.message);
    } else {
      toast.success(
        partnerToEdit ? "تم تحديث الشريك ✅" : "تم إضافة الشريك ✅"
      );
      setImage(null);
      setOpen(false);
      onAdded?.();
      onClose?.();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
        onClose?.();
      }}
      title={partnerToEdit ? "تعديل الشريك" : "إضافة شريك"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FileInput setImage={setImage} />
        <Input
          type="number"
          name="order"
          placeholder="الترتيب"
          value={order}
          onChange={(e) => setOrder(Number(e.target.value))}
        />

        <button
          type="submit"
          className="rounded bg-secondary px-4 py-2 text-white w-full cursor-pointer"
          disabled={loading}
        >
          {loading
            ? "جاري الحفظ..."
            : partnerToEdit
            ? "تحديث الشريك"
            : "إضافة شريك"}
        </button>
      </form>
    </Dialog>
  );
}
