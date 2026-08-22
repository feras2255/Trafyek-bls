import { Link } from "@/i18n/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

// ترقيم صفحات المدونة يعتمد على الروابط (SEO friendly)
export default function BlogPagination({ totalPages, currentPage, isAr }) {
  if (totalPages <= 1) return null;

  const prevPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label={isAr ? "ترقيم الصفحات" : "Pagination"}
      className="flex items-center justify-center gap-2 mt-16"
    >
      <Link
        href={{ pathname: "/blogs", query: { page: prevPage } }}
        aria-label={isAr ? "الصفحة السابقة" : "Previous page"}
        aria-disabled={currentPage === 1}
        className={`h-11 w-11 flex items-center justify-center rounded-xl border transition-all ${
          currentPage === 1
            ? "pointer-events-none opacity-40"
            : "hover:bg-primary hover:text-white"
        }`}
      >
        {isAr ? <FiChevronRight /> : <FiChevronLeft />}
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={{ pathname: "/blogs", query: { page } }}
          aria-current={currentPage === page ? "page" : undefined}
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
        href={{ pathname: "/blogs", query: { page: nextPage } }}
        aria-label={isAr ? "الصفحة التالية" : "Next page"}
        aria-disabled={currentPage === totalPages}
        className={`h-11 w-11 flex items-center justify-center rounded-xl border transition-all ${
          currentPage === totalPages
            ? "pointer-events-none opacity-40"
            : "hover:bg-primary hover:text-white"
        }`}
      >
        {isAr ? <FiChevronLeft /> : <FiChevronRight />}
      </Link>
    </nav>
  );
}
