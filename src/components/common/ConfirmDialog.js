"use client";
import { useEffect } from "react";
import ButtonSubmit from "../ui/ButtonSubmit";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white  rounded-xl shadow-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-2 text-center">
          {title || "تأكيد الحذف"}
        </h2>

        <p className="text-secondarytext text-center mb-6">
          {message || "هل أنت متأكد أنك تريد حذف هذا العنصر؟"}
        </p>

        <div className="flex justify-center gap-3">
          <ButtonSubmit
            text="اغلاق"
            type="button"
            title="اغلاق"
            variant="secondary"
            onClick={onClose}
          />

          <ButtonSubmit
            text="حذف"
            type="button"
            title="حذف"
            variant="destructive"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
}
