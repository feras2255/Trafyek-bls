"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  const [productsCount, setProductsCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // products count
    const { count: products, error: productsError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    if (!productsError) setProductsCount(products);

    // categories count
    const { data: categories, error: catError } = await supabase
      .from("products")
      .select("category");

    if (!catError && categories) {
      const uniqueCategories = new Set(categories.map((c) => c.category));
      setCategoriesCount(uniqueCategories.size);
    }

    // latest products
    const { data: latest, error: latestError } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    if (!latestError) setLatestProducts(latest);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl text-maintext font-bold">الرئيسية </h1>
      <p className="text-lg text-maintext px-4">مرحباً 👋</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card shadow rounded p-6 text-center">
          <h2 className="text-lg text-maintext font-semibold">عدد المنتجات</h2>
          <p className="text-3xl font-bold text-primary">{productsCount}</p>
        </div>

        <div className="bg-card shadow rounded p-6 text-center">
          <h2 className="text-lg text-maintext font-semibold">عدد التصنيفات</h2>
          <p className="text-3xl font-bold text-primary">{categoriesCount}</p>
        </div>
      </div>

      {/* latest 5 products */}
      <div className="shadow p-6">
        <h2 className="text-2xl text-secondary font-semibold mb-4">
          آخر المنتجات المضافة
        </h2>
        {latestProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <div className="rounded-lg overflow-hidden border border-border">
              <table className="min-w-full bg-card">
                <thead className="bg-sidebar-primary text-maintext text-right">
                  <tr>
                    <th className="px-4 py-2 border border-border">الصورة</th>
                    <th className="px-4 py-2 border border-border">
                      اسم المنتج
                    </th>
                    <th className="px-4 py-2 border border-border">السعر</th>
                    <th className="px-4 py-2 border border-border">التصنيف</th>
                    <th className="px-4 py-2 border border-border">الاجراء</th>
                  </tr>
                </thead>
                <tbody>
                  {latestProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-accent">
                      <td className="px-4 py-2 border border-border">
                        <Image
                          src={product.image_url}
                          alt={product.title}
                          width={60}
                          height={60}
                          className="object-cover rounded"
                        />
                      </td>
                      <td className="px-4 py-2 border border-border text-maintext">
                        {product.title}
                      </td>
                      <td className="px-4 py-2 border border-border text-secondary">
                        {product.price} ريال
                      </td>
                      <td className="px-4 py-2 text-primary font-semibold border border-border">
                        {product.category}
                      </td>
                      <td className="px-4 py-2 text-primary font-semibold border border-border text-center">
                        <Link
                          href={`/dashboard/products/edit/${product.id}`}
                          className="px-4 py-2 bg-chart-2 text-background font-semibold border border-border rounded-md "
                        >
                          تعديل
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">لا يوجد منتجات بعد.</p>
        )}
      </div>
    </div>
  );
}
