"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CategoryFilter({ onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, title");
      if (!error) setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-secondarytext bg-card rounded px-3 py-2 outline-none"
    >
      <option value="">كل التصنيفات</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.title}
        </option>
      ))}
    </select>
  );
}
