"use client";
import Link from "next/link";
import React from "react";

export default function StatsCards({ stats }) {
  const cards = [
    {
      id: 1,
      title: "عدد المنتجات",
      value: stats.products,
      color: "text-destructive",
      link: "/dashboard/products",
    },
    {
      id: 2,
      title: "عدد التصنيفات",
      value: stats.categories,
      color: "text-primary",
      link: "/dashboard/categories",
    },
    {
      id: 3,
      title: "عدد المشاريع",
      value: stats.projects,
      color: "text-accent",
      link: "/dashboard/projects",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-card shadow rounded-lg p-6  border border-border hover:shadow-lg transition"
        >
          <h2 className="text-lg text-secondary font-semibold">{card.title}</h2>
          <p
            className={`text-xl md:text-4xl text-center font-bold m-3 ${card.color}`}
          >
            {card.value}
          </p>
          <Link
            href={card.link}
            className="py-2 px-4 text-blue-600 flex justify-end underline "
          >
            عرض الكل
          </Link>
        </div>
      ))}
    </div>
  );
}
