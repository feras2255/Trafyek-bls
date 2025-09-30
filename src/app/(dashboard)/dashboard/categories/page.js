"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AddCategory from "@/components/dashboard/AddCategory";
import Image from "next/image";
import { toast } from "sonner";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setCategories(data);
  };

  // استخراج المسار الصحيح من URL
  const extractFilePath = (url) => {
    try {
      // نقسم على "categories/" عشان نجيب الجزء اللي بعد اسم البكيت
      const parts = url.split("categories/");
      return parts[1]; // مثال: "uploads/1759150822460.png"
    } catch {
      return null;
    }
  };

  // حذف التصنيف + الصورة
  const handleDelete = async (id, imageUrl) => {
    // أولاً نحذف الصورة من التخزين
    if (imageUrl) {
      const filePath = extractFilePath(imageUrl);
      if (filePath) {
        const { error: storageError } = await supabase.storage
          .from("categories") // اسم البكيت
          .remove([filePath]);

        if (storageError) {
          console.error("خطأ في حذف الصورة:", storageError.message);
        } else {
          console.log("Storage remove success:", filePath);
        }
      }
    }

    // ثانياً نحذف السجل من الجدول
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (!error) {
      setCategories(categories.filter((c) => c.id !== id));
      toast("تم حذف التصنيف بنجاح.");
    } else {
      toast("فشل حذف التصنيف.");
    }
  };

  const handleSaved = (category) => {
    if (editingCategory) {
      // تعديل
      setCategories(
        categories.map((c) => (c.id === category.id ? category : c))
      );
      setEditingCategory(null);
    } else {
      // إضافة
      setCategories([category, ...categories]);
    }
  };

  return (
    <div className=" space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-primary text-2xl font-bold">إدارة التصنيفات</h1>
        <AddCategory onAdded={handleSaved} />
      </div>

      <table className="w-full bg-card shadow rounded border border-border overflow-hidden mt-6">
        <thead className="bg-sidebar-primary text-maintext text-center">
          <tr>
            <th className="p-3">#</th>
            <th className="p-3">اسم التصنيف</th>
            <th className="p-3">صورة التصنيف</th>
            <th className="p-3">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((c, index) => (
            <tr key={c.id} className="border text-maintext text-center">
              <td className="p-3">{index + 1}</td>
              <td className="p-3 font-semibold">{c.title}</td>
              <td className="p-2 ">
                <Image
                  src={c.image_url || "/defult.png"}
                  alt={c.title}
                  width={60}
                  height={60}
                  className="object-cover rounded-full mx-auto"
                />
              </td>
              <td className="p-3">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setEditingCategory(c)}
                    className="bg-background text-white px-3 py-1 rounded cursor-pointer"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => handleDelete(c.id, c.image_url)}
                    className="bg-destructive text-white px-3 py-1 rounded cursor-pointer"
                  >
                    حذف
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {categories.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4 text-gray-500">
                لا توجد تصنيفات بعد.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {editingCategory && (
        <AddCategory
          categoryToEdit={editingCategory}
          onAdded={handleSaved}
          onClose={() => setEditingCategory(null)}
        />
      )}
    </div>
  );
}
