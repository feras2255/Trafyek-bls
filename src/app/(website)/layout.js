import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/footer";
import Header from "@/components/header";
import PageLoader from "@/components/PageLoader/PageLoader";
import React from "react";

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
