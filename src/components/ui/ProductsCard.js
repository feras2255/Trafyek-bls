"use client";

import Image from "next/image";
import Link from "next/link";

export default function ProductsCard({ service, prams }) {
  console.log(service);
  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-maintext relative w-full h-36 md:h-48">
        <Image
          src={service.image_url}
          alt={service.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-2 md:p-4 bg-card flex flex-col gap-y-2 md:gap-2">
        <h2 className="text-sm md:text-lg font-semibold text-secondary line-clamp-1">
          {service.title}
        </h2>

        <p className="text-sm text-primary font-semibold bg-muted-foreground/30 px-2 py-1 rounded">
          {service.categories?.title || "غير مصنف"}
        </p>

        <p className="text-destructive font-semibold text-xl">
          {service.price} ر.س
        </p>

        <Link
          href={`/services/${prams}/${service.id}`}
          className=" py-2 px-4 mt-2 text-maintext font-semibold bg-accent hover:bg-input text-center rounded-lg transition duration-300"
        >
          لطلب الخدمة
        </Link>
      </div>
    </div>
  );
}
