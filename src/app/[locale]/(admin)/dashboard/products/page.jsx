"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useLocale } from "next-intl";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import { toast } from "sonner";
import CategoryFilter from "@/components/dashboard/CategoryFilter";
import SortableTable from "@/components/dashboard/SortableTable";
import Pagination from "@/components/ui/Pagination";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { localized } from "@/lib/localized";

const PAGE_SIZE = 10;
const PLACEHOLDER = "/t-logo.webp";

export default function ProductsDashboard() {
  const locale = useLocale();
  const isAr = locale === "ar";

  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchProducts = useCallback(async () => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("products")
      .select(
        "id, title_ar, title_en, price, image_url, order, categories(title_ar, title_en)",
        { count: "exact" },
      )
      .order("order", { ascending: true })
      .range(from, to);

    if (selectedCategory) query = query.eq("category_id", selectedCategory);

    const { data, error, count } = await query;

    if (error) {
      console.error(error);
      toast.error("فشل جلب المنتجات");
      return;
    }

    setProducts(data || []);
    setTotal(count || 0);
  }, [page, selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // تغيير التصنيف يعيدنا للصفحة الأولى
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setPage(1);
  };

  const handleReorder = async (newProducts) => {
    const previous = products;
    setProducts(newProducts);

    // تحديث متوازٍ بدلاً من حلقة تسلسلية، مع التحقق من فشل أي عملية
    const results = await Promise.all(
      newProducts.map((p) =>
        supabase.from("products").update({ order: p.order }).eq("id", p.id),
      ),
    );

    if (results.some((r) => r.error)) {
      setProducts(previous);
      toast.error("فشل تحديث الترتيب");
      return;
    }

    toast.success("تم تحديث ترتيب المنتجات بنجاح");
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    const { error } = await supabase.from("products").delete().eq("id", id);
    setDeleting(false);

    if (error) {
      toast.error("فشل حذف المنتج");
      return;
    }

    toast.success("تم حذف المنتج بنجاح");
    // إن كانت الصفحة الحالية أصبحت فارغة نرجع صفحة للخلف
    if (products.length === 1 && page > 1) setPage((p) => p - 1);
    else fetchProducts();
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <section className="mt-6">
      <TitleWithBack
        title="إدارة المنتجات"
        url="/dashboard/products/new"
        textBtn="إضافة منتج"
      />

      <div className="mb-4">
        <CategoryFilter
          value={selectedCategory}
          onChange={handleCategoryChange}
        />
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
        renderRow={(p, index) => {
          const title = localized(p, "title", isAr);
          return (
            <>
              <td className="text-primary font-bold">
                {p.order || index + 1 + (page - 1) * PAGE_SIZE}
              </td>
              <td className="p-3 text-center">
                <Image
                  src={p.image_url || PLACEHOLDER}
                  alt={title || "product"}
                  width={60}
                  height={60}
                  className="rounded object-cover mx-auto w-[60px] h-[60px]"
                />
              </td>
              <td className="truncate max-w-xs text-fourth text-lg font-semibold">
                {title}
              </td>
              <td className="text-primary font-bold text-lg">
                {Number(p.price || 0).toFixed(2)}
              </td>
              <td>
                <p className="bg-third text-maintext px-4 py-1 rounded inline-block">
                  {localized(p.categories, "title", isAr) || "غير مصنف"}
                </p>
              </td>
              <td>
                <Link
                  href={`/dashboard/products/edit/${p.id}`}
                  aria-label="تعديل"
                  className="bg-fourth text-text px-3 py-1 rounded ml-2"
                >
                  تعديل
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedId(p.id);
                    setConfirmOpen(true);
                  }}
                  aria-label="حذف"
                  className="bg-destructive text-white px-3 py-1 rounded cursor-pointer ml-2"
                >
                  حذف
                </button>
              </td>
            </>
          );
        }}
      />

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="تأكيد الحذف"
        message="هل أنت متأكد من رغبتك في حذف هذا المنتج؟"
        onClose={() => {
          if (deleting) return;
          setConfirmOpen(false);
          setSelectedId(null);
        }}
        onConfirm={async () => {
          if (!selectedId || deleting) return;
          await handleDelete(selectedId);
          setConfirmOpen(false);
          setSelectedId(null);
        }}
      />
    </section>
  );
}
