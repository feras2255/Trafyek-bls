"use client";

import Message from "@/components/about/message";
import Vision from "@/components/about/Vision";
import WhyUs from "@/components/about/WhyUs";

export default function About() {
  return (
    <section className="container mx-auto px-4 py-10 space-y-12">
      {/* main content */}
      <div
        className="container mx-auto px-4 py-10 text-center lg:text-start"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-primary mb-6">من نحن</h2>
        <p className="text-lg text-secondarytext leading-relaxed mb-6">
          ترافيك بلس هي شركة تسويق رقمي متخصصة في تقديم حلول تسويقية مبتكرة
          تساعد المتاجر الإلكترونية والمحلات التجارية على النمو، التوسع، وتحقيق
          نتائج ملموسة.
        </p>

        <p className="text-xl font-semibold text-secondary mb-6">
          نحن لا نبيع وعود... إحنا نحقق نتائج!
        </p>

        <p className="text-lg text-secondarytext leading-relaxed mb-6">
          بفريق عمل مبدع وخبرة تسويقية عميقة بالسوق السعودي والخليجي، نقدم خدمات
          متكاملة تشمل إدارة الحملات الإعلانية، تحسين محركات البحث (SEO)، تصميم
          المحتوى، وإدارة حسابات التواصل الاجتماعي — وكل ذلك بخطط ذكية مبنية على
          فهم دقيق للسوق والجمهور.
        </p>

        <p className="text-lg text-secondarytext leading-relaxed">
          في ترافيك بلس، نشتغل معك كأننا شركاء في نجاحك، لأننا نؤمن إن كل بزنس
          يستحق ينسمع، ينشاف، ويحقق نمو حقيقي.
        </p>
      </div>

      <div className="my-12 h-[2px] w-24 bg-accent mx-auto lg:mx-0"></div>

      {/* vision */}
      <Vision />

      <div className="my-12 h-[2px] w-24 bg-accent mx-auto lg:mx-0"></div>
      <Message />

      <WhyUs />
    </section>
  );
}
