"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useLocale } from "next-intl";
import { localized } from "@/lib/localized";

export default function CategoryFilter({ onChange, value }) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, title_ar, title_en")
        .order("order", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }
      setCategories(data || []);
    };
    fetchCategories();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="تصفية حسب التصنيف"
      className="w-full text-secondarytext bg-card border border-border rounded px-3 py-2 outline-none"
    >
      <option value="">كل التصنيفات</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {localized(cat, "title", isAr) || `#${cat.id}`}
        </option>
      ))}
    </select>
  );
}
