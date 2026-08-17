/**
 * The intro band the approved designs open every inner page with: a soft
 * purple-to-white wash, one blurred radial accent, a pill badge, the H1 and a
 * single line of supporting copy.
 *
 * Extracted rather than repeated per page — it is byte-identical across the
 * contact, services, about, blog, work and legal designs.
 */
export default function PageIntro({ badge, title, description, children }) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#faf7ff] to-background px-6 pt-[70px] pb-[60px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-25 -right-25 size-100 rounded-full bg-primary/15 blur-[80px]"
      />
      <div className="relative mx-auto max-w-[900px] text-center">
        {badge ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4.5 py-1.5 text-[13px] font-extrabold text-primary">
            {badge}
          </span>
        ) : null}

        <h1 className="mt-4.5 mb-3 text-3xl font-black tracking-[-0.01em] text-accent md:text-[44px]">
          {title}
        </h1>

        {description ? (
          <p className="mx-auto max-w-[640px] text-[17px] leading-[1.8] text-subtext">
            {description}
          </p>
        ) : null}

        {children}
      </div>
    </section>
  );
}
