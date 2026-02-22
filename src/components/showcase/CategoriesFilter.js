"use client";
import { useTranslations } from "next-intl";

export default function CategoriesFilter({
  categories,
  selected,
  setSelected,
  type,
}) {
  const t = useTranslations("services");

  return (
    <div className="w-full">
      <h2 className="text-2xl md:text-3xl font-bold pb-3 mb-6 border-b border-primary/20">
        {t("page_title")} {type === "projects" ? t("projects") : t("products")}
      </h2>

      <div className="relative">
        <div className="flex flex-nowrap items-center gap-3 pb-6 overflow-x-auto no-scrollbar scroll-smooth">
          <button
            onClick={() => setSelected("all")}
            className={`whitespace-nowrap text-xs md:text-base px-6 py-2.5 rounded-lg border border-border transition-all duration-300 cursor-pointer flex-shrink-0 ${
              selected === "all"
                ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                : "bg-transparent text-maintext hover:border-primary/50"
            }`}
          >
            {t("all")}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelected(cat.id)}
              className={`whitespace-nowrap text-xs md:text-base px-5 py-2.5 font-semibold rounded-lg border border-border transition-all duration-300 cursor-pointer flex-shrink-0 ${
                selected === cat.id
                  ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                  : "bg-transparent text-maintext hover:border-primary/50"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <style jsx>{`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
}
