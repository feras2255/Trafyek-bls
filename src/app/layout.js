import { Tajawal } from "next/font/google";
import "./globals.css";
import AOSProvider from "./AOSProvider";
import { SiteSettingsProvider } from "./context/SiteSettingsContext";
import { GoogleTagManager } from "@next/third-parties/google";

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
        <GoogleTagManager gtmId="GTM-K46W3W6N" />

        <SiteSettingsProvider>
          <AOSProvider>{children}</AOSProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
