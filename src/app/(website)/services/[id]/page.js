import Button from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";

export default async function ServiceDetails({ params }) {
  const { id } = params;

  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("حدث خطأ أثناء جلب المنتج:", error);
    return (
      <div className="text-center py-20 text-red-500">
        حدث خطأ، يرجى المحاولة لاحقاً.
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">
        هذا المنتج غير موجود.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-96 md:h-full relative">
          <Image
            src={product.image_url}
            alt={product.title}
            fill
            className="object-cover rounded-lg mb-6"
          />
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div
            className="text-fourth px-3"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
          <p className="text-xl font-bold">السعر: {product.price} رس</p>
          <div className="flex gap-4 mt-6">
            <Button
              title="اطلب الان"
              color="fourth"
              size="lg"
              href="https://wa.me/996530446151"
            />

            <Button
              title="اتصل بنا"
              color="secondary"
              size="lg"
              href="tel:996530446151"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
