"use client";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ item }) {
  return (
    <Link href={`/projects/${item.id}`}>
      <div className="w-full h-44 md:h-52 relative shadow rounded-xl cursor-pointer">
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          className="object-cover rounded-xl hover:scale-105 transition-all duration-300"
        />
      </div>
    </Link>
  );
}
