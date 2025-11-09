"use client";
import { useState } from "react";
import CategoriesFilter from "./CategoriesFilter";
import ShowcaseList from "./ShowcaseList";
import { usePathname } from "next/navigation";

export default function Showcase({ categories, items }) {
  const [selected, setSelected] = useState("all");
  const pathname = usePathname();

  const type = pathname.includes("projects") ? "projects" : "services";

  const filteredItems =
    selected === "all"
      ? items
      : items.filter((item) => item.category_id === selected);

  return (
    <section
      className={`container mx-auto px-4 ${
        type === "projects" ? "py-10 md:py-16" : "py-28 md:py-32"
      }`}
    >
      <CategoriesFilter
        categories={categories}
        selected={selected}
        setSelected={setSelected}
        type={type}
      />

      <ShowcaseList items={filteredItems} type={type} />
    </section>
  );
}
