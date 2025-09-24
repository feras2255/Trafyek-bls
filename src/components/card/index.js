"use client";

import Image from "next/image";
import Link from "next/link";

export default function Card({ service }) {
  return (
    <div className="bg-maintext rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-36 md:h-48">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-2 md:p-4 flex flex-col gap-1 md:gap-2">
        <h2 className="text-sm md:text-lg font-bold text-background">
          {service.title}
        </h2>

        <p className="text-sm font-semibold bg-secondarytext py-1 px-2 text-background rounded">
          {service.category}
        </p>

        <p className="text-primary font-semibold text-base">
          {service.price} ر.س
        </p>

        <Link
          href={`/services/${service.slug}`}
          className="mt-2 inline-block bg-gradient-to-r from-accent to-destructive text-white text-center py-2 px-4 rounded-lg font-medium hover:opacity-90 transition"
        >
          عرض الخدمة
        </Link>
      </div>
    </div>
  );
}
