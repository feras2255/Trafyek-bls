import Image from "next/image";
import Link from "next/link";

export default function ServicesCard({ item }) {
  return (
    <div
      key={item.id}
      className="bg-primary/10 border border-border shadow rounded-lg"
    >
      {item.image_url && (
        <div className="relative w-full h-28 md:h-60">
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="rounded-t-md object-cover"
          />
        </div>
      )}

      <div className=" px-2 md:px-4 py-4 h-full space-y-4">
        <h3 className="text-accent text-sm md:text-lg lg:text-lg font-semibold line-clamp-1">
          {item.title}
        </h3>

        {item.price && (
          <p className="text-accent text-sm lg:text-xl font-semibold">
            {item.price} رس
          </p>
        )}

        <Link
          href={`/services/${item.id}`}
          className="bg-primary hover:bg-primary/90 text-base md:text-lg text-text font-semibold w-full md:w-2/3 text-center py-1 flex items-center justify-center  rounded transition"
        >
          اطلب الآن
        </Link>
      </div>
    </div>
  );
}
