import Image from "next/image";

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
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white text-center">
      <div
        className="mt-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 px-6"
        data-aos="fade-up"
      >
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            data-aos="zoom-in"
            data-aos-delay={index * 100}
            className="bg-background rounded-xl p-6 border hover:shadow-lg transition"
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
            <div className="text-2xl text-scondary font-semibold mt-2">
              {skill.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
