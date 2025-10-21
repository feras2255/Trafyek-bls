import Link from "next/link";

export default function Hero({
  preTitle = "جاهزون لتحويل فكرتك إلى واقع!",
  title = "نبدع في تصميم موقع يعبّر عنك!",
  description = [
    "لديك فكرة أو مشروع وتبحث عن واجهة احترافية تبرز هويتك؟",
    "تصميم وتطوير مواقع ومتاجر إلكترونية بأعلى جودة واحترافية.",
  ],
  buttonText = "تواصل معنا الآن",
  buttonLink = "/contact",
  // isAnchor = false,
  // className = "",
}) {
  return (
    <section
      className={`relative flex flex-col items-center justify-center text-center py-16 md:pt-28 bg-gradient-to-b from-primary/20 to-background px-6 overflow-hidden `}
    >
      <div className="max-w-3xl" data-aos="fade-up">
        {preTitle && (
          <span
            className="text-sm md:text-lg text-maintext bg-accent px-4 py-2 rounded-full mb-2 inline-block border border-primary"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {preTitle}
          </span>
        )}

        {title && (
          <h1
            className="text-3xl md:text-6xl font-extrabold text-primary my-6 leading-snug"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            {title}
          </h1>
        )}

        {description && description.length > 0 && (
          <div>
            {description.map((desc, idx) => (
              <p
                key={idx}
                className="text-base md:text-2xl text-secondarytext mb-2"
                data-aos="fade-up"
                data-aos-delay={300 + idx * 50}
              >
                {desc}
              </p>
            ))}
          </div>
        )}

        {buttonText && (
          <Link
            href={buttonLink}
            className="inline-block bg-primary text-maintext font-semibold px-10 py-4 rounded-full shadow-md hover:shadow-lg hover:bg-primary/90 transition-all mt-4"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            {buttonText}
          </Link>
        )}
      </div>
    </section>
  );
}
