"use client";

// ترقيم صفحات يعتمد على الحالة (state) - يستخدم في لوحة التحكم
export default function Pagination({ page, totalPages, onPageChange }) {
  const safeTotal = Math.max(1, totalPages || 1);
  const current = Math.min(Math.max(1, page), safeTotal);

  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        type="button"
        onClick={() => onPageChange(current - 1)}
        aria-label="السابق"
        disabled={current <= 1}
        className="bg-fourth text-maintext text-sm md:text-base px-3 py-1 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        السابق
      </button>

      <span className="font-semibold text-base md:text-lg">
        صفحة {current} من {safeTotal}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(current + 1)}
        aria-label="التالي"
        disabled={current >= safeTotal}
        className="bg-fourth text-maintext text-sm md:text-base px-3 py-1 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        التالي
      </button>
    </div>
  );
}
