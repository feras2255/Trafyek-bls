// components/ui/Pagination.jsx

import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Pagination({ totalPages, currentPage, locale, isAr }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      <Link
        href={`/${locale}/blogs?page=${Math.max(1, currentPage - 1)}`}
        className={`h-11 w-11 flex items-center justify-center rounded-xl border transition-all ${
          currentPage === 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-primary hover:text-white"
        }`}
      >
        {isAr ? <FiChevronRight /> : <FiChevronLeft />}
      </Link>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`/${locale}/blogs?page=${page}`}
          className={`h-11 min-w-11 px-4 flex items-center justify-center rounded-xl font-bold transition-all ${
            currentPage === page
              ? "bg-primary text-white"
              : "border hover:bg-slate-100"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={`/${locale}/blogs?page=${Math.min(totalPages, currentPage + 1)}`}
        className={`h-11 w-11 flex items-center justify-center rounded-xl border transition-all ${
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-primary hover:text-white"
        }`}
      >
        {isAr ? <FiChevronLeft /> : <FiChevronRight />}
      </Link>
    </div>
  );
}
