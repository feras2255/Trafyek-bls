import { Tajawal } from "next/font/google";
import "./globals.css";
import AOSProvider from "./AOSProvider";
import PageLoader from "@/components/PageLoader/PageLoader";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "700"],
  preload: true,
});

export const metadata = {
  title: "Trafyek Bls",
  description: "افضل شركة تسويق",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${tajawal.className} `}>
        <AOSProvider>{children}</AOSProvider>
      </body>
    </html>
  );
}
