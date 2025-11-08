export default function CategoriesFilter({
  categories,
  selected,
  setSelected,
}) {
  return (
    <div>
      <h2 className="text-3xl font-semibold pb-2 mb-4 border-b border-primary">
        صفحة الخدمات
      </h2>

      <div className="flex flex-wrap items-center gap-2 pb-6">
        <button
          onClick={() => setSelected("all")}
          className={`text-[9px] md:text-base px-4 py-2 rounded-full border transition cursor-pointer ${
            selected === "all" ? "bg-accent text-maintext" : "bg-transparent"
          }`}
        >
          الكل
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat.id)}
            className={`text-[9px] md:text-base px-3 py-2 font-bold rounded-full border transition cursor-pointer ${
              selected === cat.id ? "bg-accent text-maintext" : "bg-transparent"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </div>
  );
}
