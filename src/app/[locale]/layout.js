import { Cairo } from "next/font/google";
import "./globals.css";
import AOSProvider from "./AOSProvider";
import { GoogleTagManager } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "900"],
  preload: true,
});

// meta data
export const metadata = {
  title: {
    default: "ترافيك بلس | حلول البرمجة والتسويق الرقمي المتكاملة",
    template: "%s | ترافيك بلس",
  },
  description:
    "ترافيك بلس شريكك التقني لتصميم وبرمجة المواقع الإلكترونية والمتاجر (سلة وزد) بأحدث التقنيات Next.js و Tailwind. حلول تسويقية تضمن لك النمو في السوق السعودي.",
  keywords: [
    "برمجة مواقع",
    "تطوير متاجر سلة",
    "شركة تسويق الكتروني",
    "تصميم مواقع في السعودية",
    "برمجة Next.js",
    "ترافيك بلس",
  ],
  alternates: {
    canonical: "https://www.trafyekbls.com/ar",
  },
  openGraph: {
    title: "ترافيك بلس | رائدو الحلول البرمجية الذكية",
    description:
      "نحول أفكارك إلى واقع رقمي سريع وآمن. متخصصون في بناء المنصات والمتاجر الاحترافية.",
    url: "https://www.trafyekbls.com/ar",
    siteName: "ترافيك بلس",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ترافيك بلس للبرمجة والتسويق",
    description: "أفضل الحلول البرمجية وتطوير المتاجر في المملكة.",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${cairo.className} bg-white text-slate-900 selection:bg-purple-100 selection:text-purple-900`}
      >
        <GoogleTagManager gtmId="GTM-K46W3W6N" />
        <NextIntlClientProvider messages={messages}>
          <AOSProvider>
            <main className="min-h-screen">{children}</main>
          </AOSProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
