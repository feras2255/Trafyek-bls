import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageLoader from "@/components/PageLoader/PageLoader";
import { Toaster } from "@/components/ui/sonner";
import AOSInitializer from "@/components/common/AOSInitializer";

export default function WebsiteLayout({ children }) {
  return (
    <div className="pt-14">
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
