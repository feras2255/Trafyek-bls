"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

export default function WhyUs() {
  const items = [
    { title: "الخبرة في المجال", percent: 95 },
    { title: "السرعة والأمان", percent: 90 },
    { title: "التواصل والدعم", percent: 99 },
    { title: "خبرة الفريق", percent: 93 },
  ];

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute bottom-0  left-0 w-full h-1/2 bg-gradient-to-t from-secondary/20 to-transparent z-0"></div>

      <div className="relative max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10 items-center z-10">
        <div data-aos="fade-right" className="order-1 md:order-2 py-6 z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-10 text-center md:text-right">
            لماذا نحن؟
          </h2>

          <div className="space-y-6">
            {items.map((item, index) => (
              <div key={index} data-aos="fade-up" data-aos-delay={index * 150}>
                <div className="flex justify-between mb-2 text-sm font-medium text-foreground">
                  <span>{item.title}</span>
                  <span>{item.percent}%</span>
                </div>

                <div className="w-full bg-muted h-5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-secondary rounded-full"
                    style={{
                      width: "0%",
                      animation: `fillBar-${index} 1.5s ease forwards`,
                      animationDelay: `${index * 0.3}s`,
                    }}
                  ></div>

                  <style jsx>{`
                    @keyframes fillBar-${index} {
                      from {
                        width: 0%;
                      }
                      to {
                        width: ${item.percent}%;
                      }
                    }
                  `}</style>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex justify-center order-2 md:order-1"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <Image
            src="/about.png"
            alt="لماذا نحن"
            width={500}
            height={500}
            className="relative z-10 -mb-20 md:-mb-20 object-contain"
          />
        </div>
      </div>
    </section>
  );
}
