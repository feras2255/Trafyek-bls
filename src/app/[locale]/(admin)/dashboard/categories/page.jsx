"use client";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import SortableTable from "@/components/dashboard/SortableTable";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { localized } from "@/lib/localized";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const PLACEHOLDER = "/t-logo.webp";

export default function Categories() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [categories, setCategories] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("order", { ascending: true });

    if (error) {
      console.error(error);
      toast.error("فشل جلب التصنيفات.");
      return;
    }
    setCategories(data || []);
  };

  const handleReorder = async (newCategories) => {
    const previous = categories;
    setCategories(newCategories);

    const results = await Promise.all(
      newCategories.map((c) =>
        supabase.from("categories").update({ order: c.order }).eq("id", c.id),
      ),
    );

    if (results.some((r) => r.error)) {
      setCategories(previous);
      toast.error("فشل تحديث الترتيب.");
      return;
    }
    toast.success("تم تحديث الترتيب بنجاح.");
  };

  // استخراج مسار الملف داخل الـ bucket من الرابط العام
  const extractFilePath = (url) => {
    if (!url) return null;
    const marker = "/storage/v1/object/public/categories/";
    const index = url.indexOf(marker);
    if (index === -1) return null;
    return decodeURIComponent(url.slice(index + marker.length).split("?")[0]);
  };

  const handleDelete = async (category) => {
    if (!category) return;
    setDeleting(true);

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", category.id);

    if (error) {
      setDeleting(false);
      // 23503 = foreign_key_violation (منتجات مرتبطة بهذا التصنيف)
      toast.error(
        error.code === "23503"
          ? "لا يمكن حذف التصنيف لوجود منتجات مرتبطة به."
          : "فشل حذف التصنيف.",
      );
      return;
    }

    // نحذف الصورة بعد نجاح حذف السجل فقط
    const filePath = extractFilePath(category.image_url);
    if (filePath) {
      const { error: storageError } = await supabase.storage
        .from("categories")
        .remove([filePath]);
      if (storageError)
        console.error("خطأ في حذف الصورة:", storageError.message);
    }

    setCategories((prev) => prev.filter((c) => c.id !== category.id));
    setDeleting(false);
    toast.success("تم حذف التصنيف بنجاح.");
  };

  return (
    <section>
      <TitleWithBack
        title="إدارة التصنيفات"
        textBtn="إضافة تصنيف"
        url="/dashboard/categories/new"
      />

      <SortableTable
        items={categories}
        columns={["#", "الترتيب", "الاسم", "الوصف", "الصورة", "التحكم"]}
        onReorder={handleReorder}
        renderRow={(category) => (
          <>
            <td className="text-maintext text-lg font-semibold">
              {category.order}
            </td>
            <td className="text-maintext text-md font-semibold">
              {localized(category, "title", isAr)}
            </td>
            <td>
              <p className="truncate max-w-32 text-md mx-auto text-maintext">
                {localized(category, "description", isAr)}
              </p>
            </td>

            <td className="p-2 text-center">
              <Image
                src={category.image_url || PLACEHOLDER}
                alt={category.title_ar || category.title_en || "category"}
                width={50}
                height={50}
                className="rounded-full mx-auto object-cover w-[50px] h-[50px]"
              />
            </td>
            <td className="space-x-2">
              <Link
                href={`/dashboard/categories/edit/${category.id}`}
                aria-label="تعديل"
                className="bg-accent text-text px-3 py-1 rounded ml-2"
              >
                تعديل
              </Link>
              <button
                type="button"
                onClick={() => {
                  setSelected(category);
                  setConfirmOpen(true);
                }}
                aria-label="حذف"
                className="bg-worning text-text px-3 py-1 rounded cursor-pointer"
              >
                حذف
              </button>
            </td>
          </>
        )}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="تأكيد الحذف"
        message="هل أنت متأكد من رغبتك في حذف هذا التصنيف؟"
        onClose={() => {
          if (deleting) return;
          setConfirmOpen(false);
          setSelected(null);
        }}
        onConfirm={async () => {
          if (!selected || deleting) return;
          await handleDelete(selected);
          setConfirmOpen(false);
          setSelected(null);
        }}
      />
    </section>
  );
}
