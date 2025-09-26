import Header from "@/components/header";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import PageLoader from "@/components/PageLoader/PageLoader";

export default function WebsiteLayout({ children }) {
  return (
    <div className="pt-20">
      <PageLoader logo="/logo.png" />

      <Header />
      {children}
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
