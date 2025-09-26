"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import { toast } from "sonner";
export default function ProductsDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (error) console.log(error);
    else setProducts(data);
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

      {products.length > 0 ? (
        <table className="w-full bg-card shadow rounded-md border border-border overflow-hidden">
          <thead className="bg-sidebar-primary text-maintext text-right">
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
              <tr key={p.id} className="border text-maintext font-semibold">
                <td className="p-3">
                  <Image
                    src={p.image_url}
                    alt={p.title}
                    width={100}
                    height={100}
                    className="object-cover rounded"
                  />
                </td>
                <td className="p-3">{p.title}</td>
                <td className="p-3">{p.price} ريال</td>
                <td className="p-3">{p.category}</td>
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
