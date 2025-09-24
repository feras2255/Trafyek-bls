import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/footer";
import Header from "@/components/header";
import React from "react";

export default function WebsiteLayout({ children }) {
  return (
    <div className="pt-20">
      <Header />
      {children}
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
