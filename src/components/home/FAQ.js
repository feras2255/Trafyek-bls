"use client";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { FiPlus, FiMinus, FiHelpCircle, FiPhoneCall } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function FAQ({ whatsapp }) {
  const t = useTranslations("faq");
  const locale = useLocale();
  const isRtl = locale === "ar";
  const [openIndex, setOpenIndex] = useState("null");

  const faqs = [
    { question: t("q1"), answer: t("a1") },
    { question: t("q2"), answer: t("a2") },
    { question: t("q3"), answer: t("a3") },
    { question: t("q4"), answer: t("a4") },
    { question: t("q5"), answer: t("a5") },
  ];

  return (
    <section
      className="pb-24 bg-background overflow-hidden"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest">
            <FiHelpCircle /> {t("badge")}
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-accent">
            {t("title")}
          </h2>
          <div className="w-24 h-1.5 bg-primary/20 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-primary w-1/2 rounded-full" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* FAQ Accordion */}
          <div className="w-full lg:w-7/12 space-y-5">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`group border rounded-2xl transition-all duration-500 overflow-hidden ${
                  openIndex === index
                    ? "bg-text border-primary/30 shadow-xl shadow-primary/5"
                    : "bg-transparent border-border hover:border-primary/20"
                }`}
              >
                <button
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  aria-label="السؤال"
                  className="w-full py-4 px-2 md:p-8 flex justify-between items-center text-right transition-all cursor-pointer"
                >
                  <span
                    className={`text-sm md:text-xl font-black transition-colors ${
                      openIndex === index ? "text-primary" : "text-accent"
                    }`}
                  >
                    {faq.question}
                  </span>

                  <div
                    className={`flex items-center justify-center shrink-0 w-10 h-10 rounded-full transition-all duration-500 ${
                      openIndex === index
                        ? "bg-primary text-text rotate-180"
                        : "bg-secondary/20 text-primary"
                    }`}
                  >
                    {openIndex === index ? (
                      <FiMinus size={20} />
                    ) : (
                      <FiPlus size={20} />
                    )}
                  </div>
                </button>

                <div
                  className={`transition-all duration-500 ease-in-out ${
                    openIndex === index
                      ? "max-h-[300px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 md:px-8 pb-8 pt-0">
                    <p className="text-subtext text-sm md:text-lg leading-relaxed font-medium border-t border-border pt-6">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Side */}
          <div className="w-full lg:w-5/12 sticky top-24 flex flex-col gap-6">
            {/* Image Box */}
            <div className="relative w-full h-64 md:h-[370px] rounded-3xl overflow-hidden group border-4 border-white shadow-2xl shadow-primary/5">
              <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/5 transition-colors duration-500 z-10" />
              <Image
                src="/fq.png"
                alt="Support"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
              />
            </div>

            {/* Call to Action Badge - Now Below the Image */}
            <div className="bg-text border border-border p-8 rounded-3xl z-20 shadow-2xl shadow-primary/5 transition-all hover:border-primary/20 group">
              <div className="flex items-center gap-4 mb-5">
                <div className="bg-primary/10 text-primary p-4 rounded-xl text-3xl transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-6">
                  <FiPhoneCall />
                </div>
                <div className="space-y-1 text-start">
                  {" "}
                  {/* أضفنا text-start لضمان المحاذاة مع اتجاه اللغة */}
                  <p className="text-accent font-black text-base md:text-2xl">
                    {t("ctaBadge.question")}
                  </p>
                  <p className="text-subtext text-xs md:text-base font-medium">
                    {t("ctaBadge.availability")}
                  </p>
                </div>
              </div>

              <Link
                href={whatsapp ? `https://wa.me/${whatsapp}` : "/contact"}
                aria-label="واتساب"
                className="flex items-center justify-center w-full bg-secondary text-primary font-black py-4 rounded-2xl text-lg uppercase tracking-tighter hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                {t("ctaBadge.button")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
