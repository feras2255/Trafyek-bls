"use client";
import { use, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Hero() {
  const phathname = usePathname();
  const isContact = phathname === "/contact";
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center text-center py-16 md:pt-28 bg-gradient-to-b from-primary/20 to-background px-6 overflow-hidden">
      <div className="max-w-3xl" data-aos="fade-up">
        <span
          className="text-sm md:text-lg text-maintext bg-accent px-4 py-2 rounded-full mb-2 inline-block border border-primary"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          جاهزون لتحويل فكرتك إلى واقع!
        </span>
        {isContact ? (
          <h1
            className="text-3xl md:text-6xl font-extrabold text-primary my-10 leading-snug"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            سعداء بتواصلك معنا!
          </h1>
        ) : (
          <h1
            className="text-3xl md:text-6xl font-extrabold text-primary mb-6 leading-snug"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            نبدع في تصميم موقع يعبّر عنك!
          </h1>
        )}

        {isContact ? (
          <p
            className="text-base md:text-2xl text-secondarytext mb-16"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            فريقنا جاهز للرد عليك في أي وقت{" "}
          </p>
        ) : (
          <>
            <p
              className="text-base md:text-2xl text-secondarytext mb-2"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              لديك فكرة أو مشروع وتبحث عن واجهة احترافية تبرز هويتك؟
            </p>
            <p
              className="text-base md:text-xl text-secondarytext mb-10"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              تصميم وتطوير مواقع ومتاجر إلكترونية بأعلى جودة واحترافية.
            </p>
          </>
        )}
        {isContact ? (
          <a
            href="#contact"
            className="inline-block bg-primary text-maintext font-semibold px-10 py-4 rounded-full shadow-md hover:shadow-lg hover:bg-primary/90 transition-all "
          >
            تواصل معنا الآن
          </a>
        ) : (
          <Link
            href="/contact"
            data-aos="fade-up"
            data-aos-delay="400"
            className="inline-block bg-primary text-maintext font-semibold px-10 py-4 rounded-full shadow-md hover:shadow-lg hover:bg-primary/90 transition-all"
          >
            تواصل معنا الآن
          </Link>
        )}
      </div>
    </section>
  );
}
