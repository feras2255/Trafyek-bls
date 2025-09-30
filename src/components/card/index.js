"use client";

import Image from "next/image";
import Link from "next/link";

export default function Card({ service }) {
  return (
    <div className="bg-maintext rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative w-full h-36 md:h-48">
        <Image
          src={service.image_url}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-2 md:p-4 bg-card flex flex-col gap-y-2 md:gap-2">
        <h2 className="text-sm md:text-lg font-bold text-primary">
          {service.title}
        </h2>

        <p className="text-sm text-secondarytext font-semibold bg-accent px-2 py-1 rounded">
          {service.categories?.title || "غير مصنف"}
        </p>

        <p className="text-maintext font-semibold text-xl">
          {service.price} ر.س
        </p>

        <Link
          href={`/services/${service.slug}`}
          className=" py-2 px-4 mt-2 text-white font-semibold bg-background hover:bg-background/80 text-center rounded-lg transition"
        >
          لطلب الخدمة
        </Link>
      </div>
    </div>
  );
}
