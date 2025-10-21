"use client";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import AddCategory from "@/components/dashboard/AddCategory";
import SortableTable from "@/components/dashboard/SortableTable";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // fetch categories
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("order", { ascending: true });

    if (error) toast.error("فشل جلب التصنيفات.");
    else setCategories(data || []);
  };

  // update order
  const handleReorder = async (newCategories) => {
    setCategories(newCategories);

    try {
      for (let c of newCategories) {
        await supabase
          .from("categories")
          .update({ order: c.order })
          .eq("id", c.id);
      }
      toast.success("تم تحديث الترتيب بنجاح.");
    } catch (err) {
      toast.error("فشل تحديث الترتيب.");
    }
  };

  // extract the file path from the URL
  const extractFilePath = (url) => {
    try {
      const parts = url.split("categories/");
      return parts[1];
    } catch {
      return null;
    }
  };

  // delete category
  const handleDelete = async (id, imageUrl) => {
    if (imageUrl) {
      const filePath = extractFilePath(imageUrl);
      if (filePath) {
        const { error: storageError } = await supabase.storage
          .from("categories")
          .remove([filePath]);

        if (storageError)
          console.error("خطأ في حذف الصورة:", storageError.message);
        else console.log("Storage remove success:", filePath);
      }
    }

    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (!error) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      toast.success("تم حذف التصنيف بنجاح.");
    } else {
      toast.error("فشل حذف التصنيف.");
    }
  };

  // add category or update
  const handleSaved = (category) => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((c) => (c.id === category.id ? category : c))
      );
      setEditingCategory(null);
    } else {
      setCategories((prev) => [...prev, category]);
    }
  };

  return (
    <section>
      {/* <div className="flex items-center justify-between">
        <h1 className="text-secondary text-2xl font-bold">إدارة التصنيفات</h1>
        <AddCategory onAdded={handleSaved} />
      </div> */}

      <TitleWithBack
        title="إضافة تصنيف جديد"
        textBtn="إضافة تصنيف"
        url="/dashboard/categories/new"
      />

      <SortableTable
        items={categories}
        columns={["#", "الترتيب", "الاسم", "الوصف", "الصورة", "التحكم"]}
        onReorder={handleReorder}
        renderRow={(category) => (
          <>
            <td className="text-secondary text-lg font-semibold">
              {category.order}
            </td>
            <td className="text-secondary text-md font-semibold">
              {category.title}
            </td>
            <td>
              <p className="truncate max-w-32 text-md mx-auto text-scondary">
                {category.description}{" "}
              </p>
            </td>

            <td className="p-2 text-center">
              <Image
                src={category.image_url || "/default.png"}
                alt={category.title}
                width={50}
                height={50}
                style={{ width: "auto", height: "auto" }}
                className="rounded-full mx-auto object-cover"
              />
            </td>
            <td className="space-x-2">
              <Link
                href={`/dashboard/categories/edit/${category.id}`}
                className="bg-secondary text-white px-3 py-1 rounded ml-2"
              >
                تعديل
              </Link>
              <button
                onClick={() => {
                  setSelectedId(category.id);
                  setConfirmOpen(true);
                }}
                // onClick={() => handleDelete(category.id, category.image_url)}
                className="bg-destructive text-white px-3 py-1 rounded cursor-pointer"
              >
                حذف
              </button>
            </td>
          </>
        )}
      />

      {editingCategory && (
        <AddCategory
          categoryToEdit={editingCategory}
          onAdded={handleSaved}
          onClose={() => setEditingCategory(null)}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="تأكيد الحذف"
        message="هل أنت متأكد من رغبتك في حذف هذا المشروع؟"
        onClose={() => {
          setConfirmOpen(false);
          setSelectedId(null);
        }}
        onConfirm={async () => {
          if (selectedId) {
            await handleDelete(selectedId);
            setConfirmOpen(false);
            setSelectedId(null);
          }
        }}
      />
    </section>
  );
}
