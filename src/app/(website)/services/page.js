"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Slider() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (!error) setCategories(data);
    };
    fetchCategories();
  }, []);
  return (
    <div className="container mx-auto px-4 py-20 ">
      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, i) => (
          <Link
            href={`/services/${category.id}`}
            key={category.id}
            data-aos="zoom-in-up"
            data-aos-delay={i * 100}
          >
            <div className="relative w-full h-full aspect-square overflow-hidden rounded-2xl  hover:scale-105 transition-transform duration-500">
              <Image
                src={category.image_url}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
