import PageHero from "@/components/ui/PageHero";
import { getLocale, getTranslations } from "next-intl/server";
import Services from "@/components/home/Services";

export default async function ServicesPage() {
  const t = await getTranslations("services");
  const locale = await getLocale();
  const isAr = locale === "ar";

  const breadcrumb = [{ label: isAr ? "الخدمات" : "Services", href: null }];

  return (
    <main>
      <PageHero
        title={t("title")}
        description={t("description")}
        breadcrumbData={breadcrumb}
        isAr={isAr}
        showButtons={true}
        scrollToId="projects-grid"
      />

      <div id="projects-grid" className="py-10">
        <Services />
      </div>
    </main>
  );
}
