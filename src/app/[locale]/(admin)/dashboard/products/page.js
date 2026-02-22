// "use client";
// import { useEffect, useState } from "react";
// import { supabase } from "@/lib/supabaseClient";
// import Link from "next/link";
// import Image from "next/image";
// import TitleWithBack from "@/components/dashboard/TitleWithBack";
// import { toast } from "sonner";
// import CategoryFilter from "@/components/dashboard/CategoryFilter";
// import SortableTable from "@/components/dashboard/SortableTable";

// export default function ProductsDashboard() {
//   const [products, setProducts] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");

//   useEffect(() => {
//     fetchProducts();
//   }, [selectedCategory]);

//   const fetchProducts = async () => {
//     let query = supabase
//       .from("products")
//       .select("id, title, price, image_url, order, categories(title)");

//     if (selectedCategory) query = query.eq("category_id", selectedCategory);

//     const { data, error } = await query.order("order", { ascending: true });

//     if (error) toast.error("فشل جلب المنتجات");
//     else setProducts(data || []);
//   };

//   const handleReorder = async (newProducts) => {
//     setProducts(newProducts);
//     try {
//       for (let p of newProducts) {
//         await supabase
//           .from("products")
//           .update({ order: p.order })
//           .eq("id", p.id);
//       }
//       toast.success("تم تحديث ترتيب المنتجات بنجاح");
//     } catch {
//       toast.error("فشل تحديث الترتيب");
//     }
//   };

//   const handleDelete = async (id) => {
//     const { error } = await supabase.from("products").delete().eq("id", id);

//     if (error) toast.error("فشل حذف المنتج");
//     else {
//       toast.success("تم حذف المنتج بنجاح");
//       setProducts((prev) => prev.filter((p) => p.id !== id));
//     }
//   };

//   return (
//     <section className="mt-6">
//       <TitleWithBack
//         title="إدارة المنتجات"
//         url="/dashboard/products/new"
//         textBtn="إضافة منتج"
//       />

//       <div className=" mb-4">
//         <CategoryFilter onChange={setSelectedCategory} />
//       </div>

//       <SortableTable
//         items={products}
//         columns={[
//           "#",
//           "الترتيب",
//           "الصورة",
//           "العنوان",
//           "السعر",
//           "التصنيف",
//           "الإجراءات",
//         ]}
//         onReorder={handleReorder}
//         renderRow={(p, index) => (
//           <>
//             <td className="text-secondary font-bold">{p.order || index + 1}</td>
//             <td className="p-3 text-center">
//               <Image
//                 src={p.image_url}
//                 alt={p.title}
//                 width={60}
//                 height={60}
//                 className="rounded object-cover mx-auto"
//               />
//             </td>
//             <td className="truncate max-w-xs text-secondary text-lg font-semibold">
//               {p.title}
//             </td>
//             <td className="text-primary font-bold text-lg">{p.price},00</td>
//             <td>
//               <p className="bg-accent text-maintext px-4 py-1 rounded inline-block">
//                 {p.categories?.title || "غير مصنف"}
//               </p>
//             </td>
//             <td>
//               <Link
//                 href={`/dashboard/products/edit/${p.id}`}
//                 className="bg-secondary text-white px-3 py-1 rounded ml-2"
//               >
//                 تعديل
//               </Link>
//               <button
//                 onClick={() => handleDelete(p.id)}
//                 className="bg-destructive text-white px-3 py-1 rounded cursor-pointer ml-2"
//               >
//                 حذف
//               </button>
//             </td>
//           </>
//         )}
//       />
//     </section>
//   );
// }

"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Image from "next/image";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import { toast } from "sonner";
import CategoryFilter from "@/components/dashboard/CategoryFilter";
import SortableTable from "@/components/dashboard/SortableTable";
import Pagination from "@/components/ui/Pagination";
import ConfirmDialog from "@/components/common/ConfirmDialog";

export default function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, page]);

  const fetchProducts = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("products")
      .select("id, title, price, image_url, order, categories(title)", {
        count: "exact",
      })
      .order("order", { ascending: true })
      .range(from, to);

    if (selectedCategory) query = query.eq("category_id", selectedCategory);

    const { data, error, count } = await query;

    if (error) {
      toast.error("فشل جلب المنتجات");
    } else {
      setProducts(data || []);
      setTotal(count || 0);
    }
  };

  const handleReorder = async (newProducts) => {
    setProducts(newProducts);
    try {
      for (let p of newProducts) {
        await supabase
          .from("products")
          .update({ order: p.order })
          .eq("id", p.id);
      }
      toast.success("تم تحديث ترتيب المنتجات بنجاح");
    } catch {
      toast.error("فشل تحديث الترتيب");
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) toast.error("فشل حذف المنتج");
    else {
      toast.success("تم حذف المنتج بنجاح");
      setProducts((prev) => prev.filter((p) => p.id !== id));
      fetchProducts();
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <section className="mt-6">
      <TitleWithBack
        title="إدارة المنتجات"
        url="/dashboard/products/new"
        textBtn="إضافة منتج"
      />

      <div className="mb-4">
        <CategoryFilter onChange={setSelectedCategory} />
      </div>

      <SortableTable
        items={products}
        columns={[
          "#",
          "الترتيب",
          "الصورة",
          "العنوان",
          "السعر",
          "التصنيف",
          "الإجراءات",
        ]}
        onReorder={handleReorder}
        renderRow={(p, index) => (
          <>
            <td className="text-primary font-bold">
              {p.order || index + 1 + (page - 1) * pageSize}
            </td>
            <td className="p-3 text-center">
              <Image
                src={p.image_url}
                alt={p.title}
                width={60}
                height={60}
                className="rounded object-cover mx-auto"
              />
            </td>
            <td className="truncate max-w-xs text-fourth text-lg font-semibold">
              {p.title}
            </td>
            <td className="text-primary font-bold text-lg">{p.price},00</td>
            <td>
              <p className="bg-third text-maintext px-4 py-1 rounded inline-block">
                {p.categories?.title || "غير مصنف"}
              </p>
            </td>
            <td>
              <Link
                href={`/dashboard/products/edit/${p.id}`}
                className="bg-fourth text-maintext px-3 py-1 rounded ml-2"
              >
                تعديل
              </Link>
              <button
                onClick={() => {
                  setSelectedId(p.id);
                  setConfirmOpen(true);
                }}
                className="bg-destructive text-white px-3 py-1 rounded cursor-pointer ml-2"
              >
                حذف
              </button>
            </td>
          </>
        )}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

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
