import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative -top-20 w-full h-[250px] md:h-[900px]">
      <Image
        src="/hero.webp"
        alt="hero"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
