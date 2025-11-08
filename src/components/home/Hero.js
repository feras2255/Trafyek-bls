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
}) {
  return (
    <section className="relative overflow-hidden h-screen bg-black flex flex-col items-center justify-center text-center  px-6">
      {/* Glow Right */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[150px] bg-[#8755f0] blur-[180px] rounded-full pointer-events-none"></div>

      {/* Glow Left */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[150px] bg-[#8755f0] blur-[180px] rounded-full pointer-events-none"></div>

      <div
        className="max-w-3xl mt-20 space-y-6 md:space-y-0"
        data-aos="fade-up"
      >
        {preTitle && (
          <span
            className="text-sm md:text-lg text-maintext bg-accent px-4 py-2 rounded-full inline-block border border-primary"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {preTitle}
          </span>
        )}

        {title && (
          <h1
            className="text-3xl md:text-6xl font-extrabold text-secondary leading-snug"
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
                className="text-base md:text-2xl text-maintext mb-2"
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
            className="inline-block bg-third text-maintext font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-third/90 transition-all duration-500 ease-in-out mt-4"
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
