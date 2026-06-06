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
  metadataBase: new URL("https://www.trafyekbls.com"),

  title: {
    default:
      "ترافيك بلس | شركة تسويق رقمي في الرياض تصميم المواقع والمتاجر الإلكترونية",
    template: "%s | ترافيك بلس",
  },

  description:
    "ترافيك بلس من شركات التسويق الرقمي الرائدة في السعودية، نقدم خدمات تحسين خرائط جوجل، السيو المحلي SEO، إدارة إعلانات جوجل ومنصات التواصل الاجتماعي، تصميم المواقع والمتاجر الإلكترونية وحلول التسويق الرقمي لزيادة المبيعات وتعزيز نمو الأعمال.",
  keywords: [
    "ترافيك بلس",
    "تصميم مواقع",
    "برمجة مواقع",
    "تصميم متجر إلكتروني",
    "إنشاء متجر سلة",
    "إنشاء متجر زد",
    "تطوير المتاجر الإلكترونية",
    "تحسين محركات البحث",
    "SEO",
    "السيو المحلي",
    "خرائط جوجل",
    "Google Maps SEO",
    "إضافة نشاط تجاري على جوجل",
    "توثيق نشاط تجاري",
    "تصدر نتائج خرائط جوجل",
    "حل مشكلة تعليق نشاط جوجل",
    "إدارة حملات جوجل أدز",
    "التسويق الرقمي",
    "شركة تسويق رقمي",
    "شركة برمجة في السعودية",
    "Next.js",
    "Supabase",
  ],

  alternates: {
    canonical: "https://www.trafyekbls.com/ar",
    languages: {
      ar: "https://www.trafyekbls.com/ar",
      en: "https://www.trafyekbls.com/en",
    },
  },

  openGraph: {
    title:
      "ترافيك بلس | شركة تسويق رقمي في الرياض وتصميم المواقع والمتاجر الإلكترونية",
    description:
      "حلول احترافية في التسويق الرقمي، تحسين خرائط جوجل، SEO، إدارة الإعلانات، تصميم المواقع والمتاجر الإلكترونية للشركات في السعودية.",

    url: "https://www.trafyekbls.com/ar",

    siteName: "Traffic Plus",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Traffic Plus Digital Solutions",
      },
    ],

    locale: "ar_SA",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",

    title: "ترافيك بلس | تصميم المواقع والمتاجر الإلكترونية والتسويق الرقمي",

    description:
      "نساعد الشركات والمتاجر على النمو عبر المواقع الاحترافية والسيو وخرائط جوجل.",

    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-K46W3W6N" />
      <body
        className={`${cairo.className} bg-white text-slate-900 selection:bg-purple-100 selection:text-purple-900`}
      >
        <NextIntlClientProvider messages={messages}>
          <AOSProvider>
            <main className="min-h-screen">{children}</main>
          </AOSProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
