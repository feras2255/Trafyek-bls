"use client";
import { useState } from "react";
import CategoriesFilter from "./ServicesFilter";
import ServicesList from "./ServicesList";

export default function ServicesContent({ categories, products }) {
  const [selected, setSelected] = useState("all");

  const filteredProducts =
    selected === "all"
      ? products
      : products.filter((item) => item.category_id === selected);

  return (
    <section className="container mx-auto px-4 py-28 md:py-32">
      <CategoriesFilter
        categories={categories}
        selected={selected}
        setSelected={setSelected}
      />

      <ServicesList filteredProducts={filteredProducts} />
    </section>
  );
}
