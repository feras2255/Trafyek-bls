"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiEye, FiExternalLink } from "react-icons/fi";

export default function ProjectCard({ item, isAr }) {
  const [showOverlay, setShowOverlay] = useState(false);

  // handle touch
  const handleTouch = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div
      className="group relative overflow-hidden rounded-xl md:rounded-3xl shadow-black/5  cursor-pointer"
      onClick={handleTouch}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {/* project image */}
      <div className="relative w-full h-32 md:h-60">
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`object-cover transition-transform duration-700 ease-out ${
            showOverlay ? "scale-110" : "group-hover:scale-110"
          }`}
        />
      </div>

      {/* showOverlay || group-hover */}
      <div
        className={`absolute inset-0 z-10 transition-all duration-500 bg-accent/60 backdrop-blur-md flex flex-col items-center justify-center
        ${showOverlay ? "opacity-100 visible" : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"}
      `}
      >
        {/* details */}
        <div
          className={`text-center px-6 transition-transform duration-500 delay-75 
          ${showOverlay ? "translate-y-0" : "transform translate-y-8 group-hover:translate-y-0"}
        `}
        >
          <h3 className="text-text text-lg md:text-2xl font-black mb-2 drop-shadow-md">
            {item.title}
          </h3>
          <p className="text-text/90 text-xs md:text-sm line-clamp-2 leading-relaxed mb-4 md:mb-8 max-w-[250px] mx-auto">
            {item.description?.replace(/<[^>]*>?/gm, "")}
          </p>

          {/* icons */}
          <div className="flex items-center justify-center gap-4">
            <Link
              href={`/ourwork/${item.id}`}
              // stopPropagation
              aria-label="عرض التفاصيل"
              onClick={(e) => e.stopPropagation()}
              className="size-12 md:size-14 bg-white text-accent rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 shadow-2xl hover:-translate-y-2 active:scale-90"
              title={isAr ? "عرض التفاصيل" : "View Details"}
            >
              <FiEye className="text-2xl md:text-3xl" />
            </Link>

            {item.project_link && (
              <a
                href={item.project_link}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                rel="noopener noreferrer"
                className="size-12 md:size-14 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-white hover:text-primary transition-all duration-300 shadow-2xl hover:-translate-y-2 active:scale-90"
                title={isAr ? "زيارة الموقع" : "Visit Site"}
              >
                <FiExternalLink className="text-2xl md:text-3xl" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
