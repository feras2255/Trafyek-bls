export default function SectionTitle({ text, desc }) {
  return (
    <div className="flex flex-col items-center mb-10" data-aos="fade-up">
      <h2 className="text-3xl md:text-4xl lg:tetx-6xl font-semibold text-primary mb-4">
        {text}
      </h2>

      <div className="relative w-32 h-[2px] bg-hover">
        <span className="absolute left-1/2 -translate-x-1/2 -top-[5px] w-3 h-3 rounded-full bg-primary"></span>
      </div>
      <p className="text-subtext text-center text-sm md:text-base lg:text-lg mt-4">
        {desc && desc}
      </p>
    </div>
  );
}
