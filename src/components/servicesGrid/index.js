"use client";

import Card from "../card";

const services = [
  {
    id: 1,
    title: "تصميم متجر إلكتروني",
    image: "/design.png",
    category: "تصميم",
    price: 499,
    slug: "store-design",
  },
  {
    id: 2,
    title: "التسويق الرقمي",
    image: "/design.png",
    category: "تسويق",
    price: 299,
    slug: "digital-marketing",
  },
  {
    id: 3,
    title: "خدمات Google Maps",
    image: "/design.png",
    category: "خرائط",
    price: 199,
    slug: "google-maps",
  },
  {
    id: 4,
    title: "تحسين محركات البحث",
    image: "/design.png",
    category: "SEO",
    price: 399,
    slug: "seo",
  },
  {
    id: 1,
    title: "تصميم متجر إلكتروني",
    image: "/design.png",
    category: "تصميم",
    price: 499,
    slug: "store-design",
  },
  {
    id: 2,
    title: "التسويق الرقمي",
    image: "/design.png",
    category: "تسويق",
    price: 299,
    slug: "digital-marketing",
  },
  {
    id: 3,
    title: "خدمات Google Maps",
    image: "/design.png",
    category: "خرائط",
    price: 199,
    slug: "google-maps",
  },
  {
    id: 4,
    title: "تحسين محركات البحث",
    image: "/design.png",
    category: "SEO",
    price: 399,
    slug: "seo",
  },
];

export default function ServicesGrid() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {services.map((service) => (
          <Card key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
