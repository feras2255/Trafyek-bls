import { ImageResponse } from "next/og";

/**
 * بطاقة المشاركة الاجتماعية — تُولَّد، لا تُرفع.
 *
 * لماذا هذا الملف موجود:
 * كان الموقع يشير إلى /og-image.jpg في ثلاثة مواضع (layout.js مرتين
 * و lib/seo.js مرة) — والملف غير موجود في public/ إطلاقاً. أي أن كل مشاركة
 * على واتساب أو تويتر أو لينكدإن، وكل بطاقة معاينة تبنيها محركات الإجابة،
 * كانت تطلب صورة تعيد 404 فتظهر الرابط بلا صورة. تحقّقنا:
 *   grep -rn "og-image" src/   → 3 مواضع
 *   ls public/og-image.jpg     → No such file
 *
 * توليدها هنا يعني أنها لا يمكن أن تختفي مرة أخرى، ولا تحتاج أحداً يتذكر
 * رفع ملف عند تغيير الهوية.
 *
 * النص لاتيني عمداً: ImageResponse يحتاج ملف خط مُحمَّل صراحةً لعرض العربية،
 * وإضافة ملف خط للمستودع لأجل صورة واحدة تكلفة غير مبررة. الاسم اللاتيني
 * للعلامة يظهر بالخط الافتراضي بشكل موثوق. إن أردت البطاقة بالعربية لاحقاً،
 * يلزم إضافة Cairo كملف .ttf وتمريره في fonts هنا.
 */

export const alt = "Traffic Plus — Digital Marketing, Saudi Arabia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// من src/app/[locale]/globals.css — نفس رموز الهوية المعتمدة
const ACCENT = "#003066";
const PRIMARY = "#7b3f98";
const ORANGE = "#f7941d";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundImage: `linear-gradient(135deg, ${ACCENT} 0%, ${PRIMARY} 100%)`,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 26,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: ORANGE,
            fontWeight: 700,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: ORANGE,
            }}
          />
          Traffic Plus
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 28,
          }}
        >
          TRAFYEK BLS
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 34,
            marginTop: 24,
            color: "rgba(255,255,255,0.82)",
          }}
        >
          Digital Marketing · SEO · Google Maps · E-commerce
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 26,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          trafyekbls.com · Saudi Arabia
        </div>
      </div>
    ),
    size,
  );
}
