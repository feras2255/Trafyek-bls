"use client";
import { useState } from "react";
import CategoriesFilter from "./CategoriesFilter";
import ShowcaseList from "./ShowcaseList";

export default function Showcase({ categories, items, type, isAr }) {
  const [selected, setSelected] = useState("all");

  const filteredItems =
    selected === "all"
      ? items
      : items.filter((item) => item.category_id === selected);

  return (
    <section className={`container mx-auto px-4 md:pb-16 `}>
      <CategoriesFilter
        categories={categories}
        selected={selected}
        setSelected={setSelected}
        type={type}
      />

      <ShowcaseList items={filteredItems} type={type} isAr={isAr} />
    </section>
  );
}
