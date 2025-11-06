"use client";
import { useState } from "react";
import SectionTitle from "./SectionTitle";
import Image from "next/image";

export default function FAQ() {
  const faqs = [
    {
      question: "أحتاج موقع أو متجر إلكتروني، من أين أبدأ؟",
      answer:
        "تفكير ممتاز! يدل على فهمك لـ أهمية تواجدك الرقمي. اطلب خدمة تصميم المواقع الإلكترونية",
    },
    {
      question: "هل يشمل السعر الاستضافة والنطاق؟",
      answer: "نعم، في بعض الباقات نقدم استضافة ونطاق مجاناً للسنة الأولى.",
    },
    {
      question: "هل يمكنني طلب تعديلات بعد التسليم؟",
      answer:
        "نعم، نقدم فترة دعم فني تختلف حسب الباقة ويمكنك خلالها طلب التعديلات المناسبة.",
    },
    {
      question: "هل يمكنني تحديث الموقع بعد التسليم؟",
      answer:
        "نعم، نقدم فترة دعم فني تختلف حسب الباقة ويمكنك خلالها طلب التعديلات المناسبة.",
    },
    {
      question: "كم سيستغرق تصميم موقعي الإلكتروني؟",
      answer:
        "أقل مما تتوقع، لكن لا تتعجل! استغرقت معظم المواقع الإلكترونية التي أنجزناها سابقًا – من التخطيط إلى الإطلاق- 1-2 أسابيع.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 mx-auto">
      <SectionTitle text="الاسئلة الشائعة" />
      <div className="container mx-auto px-3 ">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-7/12 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl p-4 border border-secondarytext transition-all duration-300"
              >
                <div
                  onClick={() => toggle(index)}
                  className="w-full text-sm md:text-lg text-fourth font-semibold flex justify-between items-center cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className="flex items-center justify-center pb-1 bg-fourth size-7 text-2xl rounded-full text-secondary">
                    {openIndex === index ? "-" : "+"}
                  </div>
                </div>

                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    openIndex === index
                      ? "max-h-40 opacity-100 mt-3"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-secondarytext text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block w-full md:w-5/12">
            <Image
              src="/faq.png"
              alt="faq"
              width={300}
              height={300}
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
