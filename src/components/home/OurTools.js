import Image from "next/image";
import SectionTitle from "./SectionTitle";

const skills = [
  { name: "Sketch", value: 95, icon: "/Sketch.webp" },
  { name: "WordPress", value: 99, icon: "/WordPress.webp" },
  { name: "Figma", value: 95, icon: "/figma.webp" },
  { name: "Elementor", value: 95, icon: "/Elementor.webp" },
  { name: "Salla", value: 97, icon: "/salla.webp" },
  { name: "Zid", value: 97, icon: "/zid.webp" },
];

export default function OurTools() {
  return (
    <section className="pb-16 text-center">
      <SectionTitle text="التقنيات المستخدمة" />
      <div
        className="max-w-5xl px-3 md:px-6 mx-auto grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4"
        data-aos="fade-up"
      >
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="bg-background rounded-xl py-4 md:p-x-6 border shadow-lg"
          >
            <div className="text-3xl font-bold text-destructive">
              {skill.value}%
            </div>
            <Image
              src={`${skill.icon}`}
              alt={skill.name}
              width={80}
              height={80}
              className="mx-auto object-cover"
              priority
            />
            <div className="text-base md:text-2xl text-secondarytext font-semibold mt-2">
              {skill.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
