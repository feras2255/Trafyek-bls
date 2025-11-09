import Image from "next/image";
import Link from "next/link";

export default function ServicesCard({ item }) {
  return (
    <div key={item.id} className="shadow rounded-lg">
      {item.image_url && (
        <div className="">
          <Image
            src={item.image_url}
            alt={item.title}
            width={300}
            height={300}
            className="rounded-t-md object-cover"
          />
        </div>
      )}

      <div className="px-2 md:px-4 py-4 h-full space-y-4">
        <h3 className="text-base md:text-xl font-semibold line-clamp-1">
          {item.title}
        </h3>

        {item.price && (
          <p className="text-secondary text-xl font-bold">{item.price} رس</p>
        )}

        <Link
          href={`/services/${item.id}`}
          className="bg-fourth hover:bg-fourth/90 text-base md:text-lg text-maintext font-semibold w-full md:w-2/3 text-center py-1 flex items-center justify-center  rounded transition"
        >
          اطلب الآن
        </Link>
      </div>
    </div>
  );
}
