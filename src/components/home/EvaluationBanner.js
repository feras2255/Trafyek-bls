import Link from "next/link";

export default function EvaluationBanner() {
  return (
    <div className="w-7xl mx-auto bg-[#5E3286] rounded-2xl py-8 px-6 md:px-16 mt-8 shadow-2xl relative z-20 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-white text-center md:text-right">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-sm md:text-base font-bold">
            احصل على تقييم مجاني لموقعك الحالي خلال 24 ساعة
          </h3>
          <p className="text-xs text-purple-200">
            نكشف لك نقاط الضعف التي تكلفك عملاء — بدون أي التزام.
          </p>
        </div>
      </div>

      <Link
        href="#evaluate"
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all text-sm whitespace-nowrap"
      >
        اطلب تقييمك الآن
      </Link>
    </div>
  );
}
