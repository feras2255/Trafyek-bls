"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const PLACEHOLDER = "/t-logo.webp";

export default function ProductsCard({ service }) {
  const locale = useLocale();
  const isAr = locale === "ar";

  const categoryTitle =
    (isAr
      ? service.categories?.title_ar
      : service.categories?.title_en || service.categories?.title_ar) ||
    (isAr ? "غير مصنف" : "Uncategorized");

  return (
    <div className="bg-card rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="bg-maintext relative w-full h-36 md:h-48">
        <Image
          src={service.image_url || PLACEHOLDER}
          alt={service.title || "product"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover"
        />
      </div>

      <div className="p-2 md:p-4 bg-card flex flex-col gap-y-2 md:gap-2">
        <h2 className="text-sm md:text-lg font-semibold text-secondary line-clamp-1">
          {service.title}
        </h2>

        <p className="text-sm text-primary font-semibold bg-muted-foreground/30 px-2 py-1 rounded">
          {categoryTitle}
        </p>

        {service.price != null && (
          <p className="text-destructive font-semibold text-xl">
            {service.price} ر.س
          </p>
        )}

        <Link
          href={`/services/${service.category_id ?? ""}`}
          aria-label={service.title}
          className="py-2 px-4 mt-2 text-maintext font-semibold bg-accent hover:bg-input text-center rounded-lg transition duration-300"
        >
          {isAr ? "لطلب الخدمة" : "Request service"}
        </Link>
      </div>
    </div>
  );
}
