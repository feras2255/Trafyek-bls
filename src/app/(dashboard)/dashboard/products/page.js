"use client";
import PageHeader from "@/components/dashboard/PageHeader";
import Image from "next/image";
import { useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "منتج 1",
      price: 100,
      category: "تصميم",
      img: "/design.png",
    },
    {
      id: 2,
      name: "منتج 2",
      price: 250,
      category: "تصميم",
      img: "/design.png",
    },
    {
      id: 3,
      name: "منتج 2",
      price: 250,
      category: "تصميم",
      img: "/design.png",
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", price: "" });

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    setProducts([
      ...products,
      {
        id: products.length + 1,
        name: newProduct.name,
        price: Number(newProduct.price),
      },
    ]);
    setNewProduct({ name: "", price: "" });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <PageHeader title="المنتجات" buttonText="اضافة منتج جديد" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-card bg-cover shadow rounded-lg border border-gray-200"
          >
            <div className="relative h-40 mb-4">
              <Image
                src={p.img}
                alt={p.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <div className="p-4 space-y-4">
              <h2 className="text-2xl font-semibold text-secondary mb-2">
                {p.name}
              </h2>
              <p className="bg-accent py-1 px-3 rounded text-secondarytext">
                {" "}
                {p.category}
              </p>
              <p className="text-secondarytext">السعر: {p.price} ريال</p>
            </div>
          </div>
        ))}
      </div>

      {/* فورم الإضافة */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">إضافة منتج جديد</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <input
                type="text"
                placeholder="اسم المنتج"
                className="w-full border px-3 py-2 rounded"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="السعر"
                className="w-full border px-3 py-2 rounded"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
