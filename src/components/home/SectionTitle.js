"use client";
import { useEffect } from "react";

export default function SectionTitle({ text }) {
  return (
    <div className="flex flex-col items-center mb-10" data-aos="fade-up">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
        {text}
      </h2>

      <div className="relative w-32 h-[2px] bg-destructive">
        <span className="absolute left-1/2 -translate-x-1/2 -top-[5px] w-3 h-3 rounded-full bg-red-900"></span>
      </div>
    </div>
  );
}
