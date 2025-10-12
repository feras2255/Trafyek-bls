"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ServicesGrid() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*");
      if (!error) setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-10" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-primary mb-2">خدماتنا</h2>
        <p className="text-muted-foreground">
          اكتشف أبرز التصنيفات والخدمات التي نقدمها
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6">
        {categories.map((category, index) => (
          <div
            key={category.id}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="relative group overflow-hidden rounded-xl shadow-md cursor-pointer"
          >
            <Link
              href={`/services/${category.slug}`}
              className="block relative"
            >
              <Image
                src={category.image_url}
                alt={category.title}
                width={400}
                height={300}
                className="w-full h-30 sm:h-48 md:h-56 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500 flex items-center justify-center">
                <h3 className="text-white text-sm md:text-lg font-semibold text-center px-2">
                  {category.title}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
