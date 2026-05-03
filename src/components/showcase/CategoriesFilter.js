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
    <div className="w-full mb-16">
      <h2 className="text-2xl md:text-5xl font-black text-center pb-3 mb-3 md:mb-8 tracking-tight">
        <span className="bg-linear-to-r from-primary to-maintext bg-clip-text text-transparent">
          {type === "ourwork" ? t("ourwork") : t("servic")}
        </span>
      </h2>

      <div className="relative">
        <div className="bg-secondary w-fit mx-auto flex flex-wrap items-center justify-center gap-3 py-2 md:px-6 rounded-xl md:rounded-full overflow-x-auto">
          <button
            onClick={() => setSelected("all")}
            aria-label="الكل"
            className={`whitespace-nowrap text-xs md:text-base px-3 md:px-6 py-2.5 rounded-lg transition-all duration-300 cursor-pointer flex-shrink-0 ${
              selected === "all"
                ? "bg-linear-to-r from-primary to-hover text-text border-primary shadow-md shadow-primary/20"
                : "bg-transparent text-maintext hover:border-primary/50"
            }`}
          >
            {t("all")}
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelected(cat.id)}
              aria-label={cat.title}
              className={`text-[10px] md:text-sm px-2 md:px-5 py-2.5 font-semibold rounded-lg  transition-all duration-300 cursor-pointer flex-shrink-0 ${
                selected === cat.id
                  ? "bg-linear-to-r from-primary to-hover text-text border-primary shadow-md shadow-primary/20"
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
