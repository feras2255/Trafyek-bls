"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import { toast } from "sonner";
import CategoryFilter from "@/components/dashboard/CategoryFilter";
export default function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    let query = supabase
      .from("products")
      .select("id, title, price, image_url, categories(title)");

    if (selectedCategory) {
      query = query.eq("category_id", selectedCategory);
    }

    const { data, error } = await query;

    if (!error) setProducts(data);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast("فشل حذف المنتج.");
    } else {
      toast("تم حذف المنتج بنجاح.");
      fetchProducts();
    }
  };

  return (
    <section className="mt-6">
      <TitleWithBack
        title="إدارة المنتجات"
        url="/dashboard/products/new"
        textBtn={"إضافة منتج "}
      />
      <div className="flex  mb-4">
        <CategoryFilter onChange={setSelectedCategory} />
      </div>

      {products.length > 0 ? (
        <table className="w-full bg-card shadow rounded-md border border-border overflow-hidden">
          <thead className="bg-sidebar-primary text-maintext text-center">
            <tr>
              <th className="p-3">الصورة</th>
              <th className="p-3">العنوان</th>
              <th className="p-3">السعر</th>
              <th className="p-3">التصنيف</th>
              <th className="p-3">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr
                key={p.id}
                className="border text-maintext font-semibold text-center"
              >
                <td className="p-3">
                  <Image
                    src={p.image_url}
                    alt={p.title}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                </td>
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.price} ريال</td>
                <td className="p-3">
                  <p className="text-secondary bg-accent px-0 py-2 rounded block">
                    {p.categories?.title || "غير مصنف"}
                  </p>
                </td>
                <td className="p-3 space-x-2">
                  <Link
                    href={`/dashboard/products/edit/${p.id}`}
                    className="bg-primary text-white px-3 py-1 rounded"
                  >
                    تعديل
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-destructive text-white px-3 py-1 rounded cursor-pointer"
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex justify-center mt-44">
          <p className=" text-3xl text-primary font-bold">لا يوجد منتجات</p>
        </div>
      )}
    </section>
  );
}
