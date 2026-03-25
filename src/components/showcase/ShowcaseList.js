import ProjectCard from "./ProjectCard";
import ServicesCard from "./ServicesCard";

export default function ShowcaseList({ items, type, isAr }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 text-lg">
        لا توجد {type === "ourwork" ? "مشاريع" : "منتجات"} في هذا التصنيف
        حالياً.
      </div>
    );
  }

  return (
    <div
      className={`grid gap-y-8 md:gap-6 mt-8 ${
        type === "ourwork"
          ? "grid-cols-1 md:grid-cols-3"
          : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      {items.map((item) =>
        type === "ourwork" ? (
          <ProjectCard key={item.id} item={item} isAr={isAr} />
        ) : (
          <ServicesCard key={item.id} item={item} />
        ),
      )}
    </div>
  );
}
