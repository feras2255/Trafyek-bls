"use client";

const features = [
  {
    id: 1,
    title: "نركّز على النتائج… مش المجاملات",
    desc: "هدفنا الأساسي هو تحقيق نتائج فعلية: زيادة مبيعاتك، رفع تفاعلك، وتوسيع قاعدة عملاءك. كل حملة نطلقها مدروسة بناءً على تحليلات دقيقة وتجارب مثبتة.",
  },
  {
    id: 2,
    title: "حلول مخصصة تناسب كل نشاط",
    desc: "ما عندنا حل واحد للجميع… كل متجر، كل مشروع، وكل علامة لها خطة تسويقية مخصصة تناسب طبيعتها وجمهورها المستهدف.",
  },
  {
    id: 3,
    title: "فريق مبدع وخبير",
    desc: "وراء ترافيك بلس فريق متنوع من المسوقين، المصممين، صناع المحتوى، والمحللين اللي يشتغلون مع بعض على هدف واحد: نجاحك.",
  },
  {
    id: 4,
    title: "خدمات متكاملة تحت سقف واحد",
    desc: "من إعلانات Google وMeta، إلى SEO، محتوى، إدارة سوشيال ميديا، تصميم مواقع… كل شيء تلاقيه عندنا بجودة عالية وسرعة إنجاز.",
  },
  {
    id: 5,
    title: "تواصل، دعم، وشفافية",
    desc: "إحنا معك خطوة بخطوة. نوضح كل شيء، نسمع ملاحظاتك، ونشتغل بشفافية كاملة عشان تطمن على مشروعك وتحس إنك فعلاً في يد أمينة.",
  },
];

export default function WhyUs() {
  return (
    <section className="container mx-auto px-4 py-16" data-aos="fade-up">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center lg:text-start">
        لماذا ترافيك بلس؟
      </h2>

      <p className="text-lg text-secondarytext mb-10 text-center lg:text-start leading-relaxed">
        لأننا في ترافيك بلس ما نشتغل بطريقة{" "}
        <span className="font-semibold text-destructive">
          &quot;نسخ ولصق&quot;
        </span>
        … نشتغل بفكر، استراتيجية، واهتمام بتفاصيل مشروعك كأنه مشروعنا!
      </p>

      <div className="space-y-6">
        {features.map((feature) => (
          <div key={feature.id} className="flex gap-4 items-start">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold">
              {feature.id}
            </span>
            <p className="text-lg text-secondarytext leading-relaxed">
              <span className="font-semibold text-primary">
                {feature.title}
              </span>
              <br />
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
