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
    default: "ترافيك بلس | حلول البرمجة والتسويق الرقمي المتكاملة",
    template: "%s | ترافيك بلس",
  },
  description:
    "ترافيك بلس شريكك التقني لتصميم وبرمجة المواقع الإلكترونية والمتاجر (سلة وزد) بأحدث التقنيات Next.js و Tailwind. حلول تسويقية تضمن لك النمو في السوق السعودي.",
  keywords: [
    "ترافيك بلس",
    "إنشاء متاجر سلة",
    "تصميم متجر زد",
    "تصدر نتائج خرائط جوجل",
    "تصدر نتائج البحث في خرائط جوجل",
    "إعلانات جوجل ماب",
    "حل مشكلة تعليق حساب جوجل ماب",
    "إضافة نشاط تجاري على جوجل ماب",
    "توثيق خرائط جوجل ماب",
    "توثيق نشاط تجاري جوجل ماب",
    "إعلانات جوجل ماب للشركات",
    "إدارة حملات جوجل ادز",
    "شركة تسويق في الرياض",
    "وكالة تسويق رقمي جدة",
    "تحسين سيو المتاجر",
    "شركة برمجة Next.js",
    "برمجة مواقع في السعودية",
    "تطوير متاجر الكترونية بالرياض",
    "تهيئة محركات البحث SEO السعودية",
    "برمجة لوحات تحكم Supabase",
    "تصميم متجر سلة احترافي",
    "شركة تصميم مواقع الكترونية",
    "شركة تطوير أنظمة برمجية بالسعودية",
    "تصميم واجهات UI UX للمواقع",
    "افضل شركة تصميم متاجر الكترونية في السعودية",
  ],
  alternates: {
    canonical: "https://www.trafyekbls.com/ar",
  },
  openGraph: {
    title: "ترافيك بلس | تصميم مواقع ومتاجر احترافية وحلول تسويقية",
    description:
      "شريكك التقني لتصميم المتاجر الإلكترونية وتصدر نتائج بحث جوجل ماب. حلول متطورة باستخدام Next.js و Supabase.",
    url: "https://www.trafyekbls.com/ar",
    siteName: "ترافيك بلس - Traffic Plus",
    images: [
      {
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "وكالة ترافيك بلس للحلول الرقمية",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ترافيك بلس | تطوير متاجر وتسويق رقمي",
    description:
      "نساعدك في تصدر نتائج بحث جوجل وإنشاء متجرك الإلكتروني بأحدث التقنيات.",
    images: "/favicon.png",
  },
  icons: {
    icon: "/favicon.png",
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
