import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function EvaluationBanner() {
  const t = useTranslations("evaluationBanner");

  return (
    <div className="w-full md:w-7xl mx-auto bg-[#5E3286] rounded-2xl py-8 px-6 md:px-16 mt-8 shadow-2xl relative z-20 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3 text-white text-center md:text-start">
        <div>
          <h3 className="text-sm md:text-base font-bold">{t("title")}</h3>
          <p className="text-xs text-purple-200">{t("description")}</p>
        </div>
      </div>

      <Link
        href="#evaluate"
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition-all text-sm whitespace-nowrap"
      >
        {t("button")}
      </Link>
    </div>
  );
}
