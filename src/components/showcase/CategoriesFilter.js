"use client";
import { useTranslations } from "next-intl";

export default function CategoriesFilter({
  categories,
  selected,
  setSelected,
  type,
}) {
  const t = useTranslations("ourwork");

  return (
    <div className="w-full mb-10 overflow-hidden">
      <h2 className="text-2xl md:text-5xl font-black text-center pb-3 mb-3 md:mb-8 tracking-tight">
        <span className="bg-linear-to-r from-primary to-maintext bg-clip-text text-transparent">
          {type === "ourwork" ? t("ourwork") : t("servic")}
        </span>
      </h2>

      {/* حاوية الفلتر */}
      <div className="relative w-full max-w-full">
        <div
          className="bg-secondary w-full md:w-fit mx-auto flex items-center justify-start md:justify-center gap-2 py-2 px-3 rounded-2xl md:rounded-full overflow-x-auto no-scrollbar scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {/* زر الكل */}
          <button
            onClick={() => setSelected("all")}
            aria-label="الكل"
            className={`whitespace-nowrap text-xs md:text-base px-4 md:px-6 py-2.5 rounded-xl md:rounded-full transition-all duration-300 cursor-pointer shrink-0 font-bold ${
              selected === "all"
                ? "bg-linear-to-r from-primary to-hover text-text shadow-md shadow-primary/20"
                : "bg-transparent text-maintext hover:text-primary"
            }`}
          >
            {t("all")}
          </button>

          {/* أزرار التصنيفات */}
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelected(cat.id)}
              aria-label={cat.title}
              className={`whitespace-nowrap text-xs md:text-sm px-4 md:px-5 py-2.5 font-semibold rounded-xl md:rounded-full transition-all duration-300 cursor-pointer shrink-0 ${
                selected === cat.id
                  ? "bg-linear-to-r from-primary to-hover text-text shadow-md shadow-primary/20"
                  : "bg-transparent text-maintext hover:text-primary"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* إخفاء شريط التمرير لمتصفحات الويب الحديثة */}
        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    </div>
  );
}
