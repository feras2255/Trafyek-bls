import Link from "next/link";
import React from "react";

export default function Title() {
  return (
    <div className="container mx-auto  py-0 flex items-center justify-between mb-6">
      <div className="bg-gradient-to-r from-accent to-destructive w-fit  px-4 py-1  flex items-center justify-center rounded-lg ">
        <h1 className="text-base md:text-2xl font-semibold text-primary ">
          الاكثر طلبا
        </h1>
      </div>
      <Link href="/services">
        <h1 className="text-sm md:text-md font-bold text-primary">عرض الكل</h1>
      </Link>
    </div>
  );
}
