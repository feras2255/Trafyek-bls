import ShowcaseList from "@/components/showcase/ShowcaseList";
import { Link } from "@/i18n/navigation";

export default function FeaturedProjects({ items, type, isAr }) {
  if (!items?.length) return null;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-10">
        <div className={`space-y-3 text-right w-full md:w-auto`}>
          <div className="inline-flex items-center gap-3">
            <span className="w-8 h-1 bg-[#5E3286] rounded-full"></span>
            <h2 className="text-primary text-xl md:text-3xl font-black  inline-block">
              {isAr ? "سابقة أعمالنا" : "Featured Projects"}
            </h2>
          </div>
          <p className="text-gray-600 text-sm md:text-base max-w-xl">
            {isAr
              ? "لا نطلب منك أن تصدّقنا — شاهد النتائج التي حققناها لعملاء حقيقيين."
              : "Explore a selection of our most outstanding projects that showcase our expertise and high-quality solutions."}
          </p>
        </div>

        <Link
          href="/ourwork"
          className="bg-[#5E3286] mx-auto md:mx-0 hover:bg-[#4a266b] text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 text-sm whitespace-nowrap"
        >
          <span>{isAr ? "شاهد كل المشاريع ←" : "View All Projects →"}</span>
        </Link>
      </div>

      <ShowcaseList items={items} type={type} isAr={isAr} />
    </section>
  );
}
