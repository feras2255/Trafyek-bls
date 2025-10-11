export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="bg-secondary text-maintext text-sm md:text-base px-3 py-1 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        السابق
      </button>

      <span className="font-semibold text-base md:text-lg">
        صفحة {page} من {totalPages}
      </span>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="bg-secondary text-maintext text-sm md:text-base px-3 py-1 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        التالي
      </button>
    </div>
  );
}
