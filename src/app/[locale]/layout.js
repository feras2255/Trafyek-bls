import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";
import AOSProvider from "./AOSProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const cairo = Cairo({
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

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${cairo.className} `}>
        <GoogleTagManager gtmId="GTM-K46W3W6N" />
        <NextIntlClientProvider messages={messages}>
          <AOSProvider>{children}</AOSProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
