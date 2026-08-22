"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import Dialog from "./Dialog";
import FileInput from "../ui/FileInput";
import Input from "../ui/input";

export default function AddPartner({ onAdded, partnerToEdit = null, onClose }) {
  const [image, setImage] = useState(null);
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOrder(partnerToEdit?.order ?? "");
    setImage(null);
  }, [partnerToEdit]);

  // استخراج مسار الملف داخل الـ bucket من الرابط العام
  const extractFilePath = (url) => {
    if (!url) return null;
    const marker = "/storage/v1/object/public/partners/";
    const index = url.indexOf(marker);
    if (index === -1) return null;
    return decodeURIComponent(url.slice(index + marker.length).split("?")[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!partnerToEdit && !image) {
      toast.error("من فضلك اختر صورة الشريك");
      return;
    }

    setLoading(true);
    let imageUrl = partnerToEdit?.image_url || "";
    let oldPathToRemove = null;

    try {
      if (image) {
        const fileExt = image.name.split(".").pop();
        const filePath = `uploads/${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("partners")
          .upload(filePath, image, { cacheControl: "3600" });

        if (uploadError) throw uploadError;

        const { data: publicData } = supabase.storage
          .from("partners")
          .getPublicUrl(filePath);

        imageUrl = publicData.publicUrl;
        // نحذف الصورة القديمة بعد نجاح الحفظ فقط
        oldPathToRemove = extractFilePath(partnerToEdit?.image_url);
      }

      if (partnerToEdit) {
        const { error } = await supabase
          .from("partners")
          .update({
            image_url: imageUrl,
            order: order === "" ? partnerToEdit.order : Number(order),
          })
          .eq("id", partnerToEdit.id);
        if (error) throw error;
      } else {
        const { data: lastPartner } = await supabase
          .from("partners")
          .select("order")
          .order("order", { ascending: false })
          .limit(1)
          .maybeSingle();

        const nextOrder =
          order === "" ? (lastPartner?.order || 0) + 1 : Number(order);

        const { error } = await supabase
          .from("partners")
          .insert([{ image_url: imageUrl, order: nextOrder }]);
        if (error) throw error;
      }

      if (oldPathToRemove) {
        await supabase.storage.from("partners").remove([oldPathToRemove]);
      }

      toast.success(partnerToEdit ? "تم تحديث الشريك" : "تم إضافة الشريك");
      setImage(null);
      onAdded?.();
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "فشلت العملية");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open
      onClose={() => {
        if (loading) return;
        onClose?.();
      }}
      title={partnerToEdit ? "تعديل الشريك" : "إضافة شريك"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FileInput setImage={setImage} initialImage={partnerToEdit?.image_url} />
        <Input
          type="number"
          min="1"
          name="order"
          placeholder="الترتيب"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        />

        <button
          type="submit"
          aria-label={partnerToEdit ? "تحديث الشريك" : "إضافة شريك"}
          className="rounded bg-secondary px-4 py-2 text-white w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
