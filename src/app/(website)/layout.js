import Header from "@/components/header/Header";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageLoader from "@/components/PageLoader/PageLoader";
import { Toaster } from "@/components/ui/sonner";
import AOSInitializer from "@/components/common/AOSInitializer";

export default function WebsiteLayout({ children }) {
  return (
    <div>
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
