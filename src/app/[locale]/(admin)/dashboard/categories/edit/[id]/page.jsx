"use client";
import { useParams } from "next/navigation";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import FormManager from "@/components/dashboard/FormManager";
import { useTranslations } from "use-intl";

export default function EditCategoryPage() {
  const { id } = useParams();
  const t = useTranslations("dashboard");

  return (
    <div className="p-6">
      <TitleWithBack
        title={t("edit_data")}
        textBtn={t("back")}
        url="/dashboard/categories"
      />

      <FormManager
        type="categories"
        mode="edit"
        id={id}
        fields={["title", "description", "long_description", "order", "image"]}
      />
    </div>
  );
}
