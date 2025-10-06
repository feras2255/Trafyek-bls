export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-16 md:py-24 bg-gradient-to-b from-primary/30 to-background px-4">
      <div className="max-w-3xl">
        <h2 className="text-2xl md:text-4xl font-bold text-primary mb-4">
          جاهزين للعمل على مشروعك
        </h2>
        <h1 className="text-3xl md:text-6xl font-extrabold text-primary mb-6 leading-snug">
          نبدع في تصميم موقع رهيب لك!
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mb-8">
          لديك مشروع، وتريد بناء متجر أو موقع متكامل خاص به؟ نحن هنا لنبدع في
          تصميم موقع احترافي خاص بك أو بمشروعك.
        </p>
        <a
          href="#contact"
          className="inline-block bg-primary text-maintext font-semibold px-8 py-3 rounded-full shadow-md hover:bg-primary/90 transition-all"
        >
          تواصل معنا الآن
        </a>
      </div>
    </section>
  );
}
