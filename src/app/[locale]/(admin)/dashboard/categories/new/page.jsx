"use client";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import FormManager from "@/components/dashboard/FormManager";
import { useTranslations } from "next-intl";

export default function NewCategory() {
  const t = useTranslations("dashboard");
  return (
    <div>
      <TitleWithBack
        title={t("add")}
        textBtn={t("back")}
        url="/dashboard/categories"
      />

      <FormManager
        type="categories"
        mode="add"
        fields={["title", "description", "long_description", "image"]}
      />
    </div>
  );
}
