import Header from "@/components/header/Header";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageLoader from "@/components/PageLoader/PageLoader";
import { Toaster } from "@/components/ui/sonner";
import AOSInitializer from "@/components/common/AOSInitializer";
import Footer from "@/components/footer/Footer";
import { getLocale } from "next-intl/server";
import { siteSettings } from "@/lib/siteSettings";
import { jsonLd, organizationSchema, webSiteSchema } from "@/lib/seo";

export default async function WebsiteLayout({ children }) {
  const locale = await getLocale();
  const settings = await siteSettings();

  return (
    <div>
      {/* Organization + WebSite identity, on every public page. Neither
          existed anywhere on the site before, which left search engines and
          AI answer systems with no canonical entity to attach the brand to. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            organizationSchema({ locale, settings }),
            webSiteSchema({ locale }),
          ),
        }}
      />

      <AOSInitializer />
      <PageLoader />

      <Header />
      {children}
      <Toaster />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
