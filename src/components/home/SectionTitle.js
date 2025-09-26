"use client";

export default function SectionTitle({ text }) {
  return (
    <div className="flex flex-col items-center mb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-primary">{text}</h2>

      <div className="relative w-24 h-[2px] bg-secondary mt-3">
        <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-secondary"></span>
      </div>
    </div>
  );
}
