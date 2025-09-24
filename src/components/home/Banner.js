import Image from "next/image";

export default function Banner({ bannre }) {
  return (
    <div className="relative w-full h-[150px] md:h-[600px] my-10">
      <Image src={bannre} alt="banner" fill className="object-cover" priority />
    </div>
  );
}
