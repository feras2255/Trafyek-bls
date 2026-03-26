"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Dialog from "@/components/dashboard/Dialog";

export default function DeleteButton({ id, isAr }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await supabase.from("blogs").delete().eq("id", id);

    if (error) {
      alert(error.message);
    } else {
      setIsOpen(false);
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex-1 text-sm font-medium py-2 rounded-lg text-text bg-worning hover:bg-worning/90 transition-colors cursor-pointer"
      >
        {isAr ? "حذف" : "Delete"}
      </button>

      {/* Confirm Dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        title={isAr ? "تأكيد الحذف" : "Confirm Delete"}
      >
        <div className="text-center space-y-4" dir={isAr ? "rtl" : "ltr"}>
          <p className="text-gray-600">
            {isAr
              ? "هل أنت متأكد من حذف هذا المقال؟ لا يمكن التراجع عن هذا الإجراء."
              : "Are you sure you want to delete this article? This action cannot be undone."}
          </p>

          <div className="flex gap-3 justify-center mt-6">
            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-worning text-text px-6 py-2 rounded-lg hover:bg-worning/90 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "..." : isAr ? "نعم، احذف" : "Yes, Delete"}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-accent text-text px-6 py-2 rounded-lg hover:bg-accent/90 transition cursor-pointer"
            >
              {isAr ? "إلغاء" : "Cancel"}
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
