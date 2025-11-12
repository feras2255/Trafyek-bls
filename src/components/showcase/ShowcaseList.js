import ProjectCard from "./ProjectCard";
import ServicesCard from "./ServicesCard";

export default function ShowcaseList({ items, type }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500 text-lg">
        لا توجد {type === "projects" ? "مشاريع" : "منتجات"} في هذا التصنيف
        حالياً.
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 md:gap-6 mt-8 ${
        type === "projects"
          ? "grid-cols-1 md:grid-cols-3"
          : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      }`}
    >
      {items.map((item) =>
        type === "projects" ? (
          <ProjectCard key={item.id} item={item} />
        ) : (
          <ServicesCard key={item.id} item={item} />
        )
      )}
    </div>
  );
}
