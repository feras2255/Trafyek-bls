"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { toast } from "sonner";
import SortableTable from "@/components/dashboard/SortableTable";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import AddPartner from "@/components/dashboard/AddPartner";
import Pagination from "@/components/ui/Pagination";

export default function PartnersList() {
  const [partners, setPartners] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editingPartner, setEditingPartner] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [total, setTotal] = useState(0);

  // calculate total pages
  const totalPages = Math.ceil(total / pageSize) || 1;

  // get partners list
  const fetchPartners = async () => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error, count } = await supabase
      .from("partners")
      .select("*", { count: "exact" })
      .order("order", { ascending: true })
      .range(from, to);

    if (error) {
      console.error(error);
      toast.error("فشل في جلب قائمة الشركاء");
    } else {
      setPartners(data || []);
      setTotal(count || 0);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, [page]);

  // update order
  const handleReorder = async (newOrder) => {
    setPartners(newOrder);
    try {
      const updates = newOrder.map((partner, index) =>
        supabase
          .from("partners")
          .update({ order: index + 1 })
          .eq("id", partner.id),
      );
      await Promise.all(updates);
      toast.success("تم تحديث ترتيب الشركاء");
    } catch (error) {
      console.error(error);
      toast.error("حدث خطأ أثناء تحديث الترتيب");
    }
  };

  // delete partner
  const handleDelete = async (id) => {
    const { error } = await supabase.from("partners").delete().eq("id", id);
    if (error) {
      toast.error("فشل في الحذف");
    } else {
      toast.success("تم حذف الشريك بنجاح");
      setConfirmOpen(false);
      setSelectedId(null);
      fetchPartners();
    }
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl text-primary font-semibold">إدارة الشركاء</h1>
        <button
          type="button"
          onClick={() => setAddOpen(true)}
          className="inline-flex items-center bg-fourth text-maintext hover:bg-sidebar-primary px-3 py-2 rounded shadow-sm cursor-pointer transition duration-300"
        >
          <span className="text-md font-semibold">إضافة شريك</span>
        </button>
      </div>

      <SortableTable
        items={partners}
        columns={["#", "الترتيب", "الصورة", "التحكم"]}
        onReorder={handleReorder}
        renderRow={(partner) => (
          <>
            <td className="text-fourth text-lg font-semibold">
              {partner.order}
            </td>

            <td className="p-2 text-center">
              <div className="w-16 h-16 relative mx-auto">
                <Image
                  src={partner.image_url || "/default.png"}
                  alt="صورة الشريك"
                  fill
                  sizes="100%"
                  className="object-contain rounded-full"
                />
              </div>
            </td>

            <td className="space-x-2 text-center">
              <button
                onClick={() => setEditingPartner(partner)}
                className="bg-fourth text-maintext px-3 py-1 rounded ml-2 cursor-pointer"
              >
                تعديل
              </button>

              <button
                onClick={() => {
                  setSelectedId(partner.id);
                  setConfirmOpen(true);
                }}
                className="bg-destructive text-white px-3 py-1 rounded cursor-pointer"
              >
                حذف
              </button>
            </td>
          </>
        )}
      />

      {/* pagination */}
      {total > pageSize && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {/* add partner modal */}
      {(addOpen || editingPartner) && (
        <AddPartner
          onAdded={() => {
            fetchPartners();
            setAddOpen(false);
            setEditingPartner(null);
          }}
          partnerToEdit={editingPartner}
          onClose={() => {
            setAddOpen(false);
            setEditingPartner(null);
          }}
        />
      )}

      {/* confirm dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="تأكيد الحذف"
        message="هل أنت متأكد من رغبتك في حذف هذا الشريك؟"
        onClose={() => {
          setConfirmOpen(false);
          setSelectedId(null);
        }}
        onConfirm={() => handleDelete(selectedId)}
      />
    </section>
  );
}
