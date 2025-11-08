import Image from "next/image";
import Link from "next/link";

export default function ServicesList({ filteredProducts }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mt-8">
      {filteredProducts.map((product) => (
        <div key={product.id} className="shadow rounded-lg">
          <div className="">
            <Image
              src={product.image_url}
              alt={product.title}
              width={300}
              height={300}
              className="rounded-t-md object-cover "
            />
          </div>
          <div className="px-2 md:px-4 py-4 h-full space-y-2">
            <h3 className="text-xl font-semibold line-clamp-1">
              {product.title}
            </h3>
            <p className="text-secondary text-xl font-bold">
              {product.price} رس
            </p>

            <Link
              href={`/services/${product.id}`}
              className="bg-fourth hover:bg-fourth/90 text-base md:text-xl text-maintext font-semibold w-full md:w-2/3 text-center py-2 flex items-center justify-center mx-auto rounded transition"
            >
              اطلب الآن
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
