import Image from "next/image";

export default function PaymentIcons() {
  const icons = [
    { src: "/pay/stc.webp", alt: "stc" },
    { src: "/pay/master.webp", alt: "MasterCard" },
    { src: "/pay/mada.webp", alt: "Mada" },
    { src: "/pay/apple.webp", alt: "Apple Pay" },
    { src: "/pay/tabby.webp", alt: "tabby" },
    { src: "/pay/tamara.webp", alt: "tamara" },
  ];

  return (
    <div className="flex gap-2 mg:gap-4 items-center">
      {icons.map((icon, index) => (
        <div key={index} className="p-1 rounded-md">
          <Image
            src={icon.src}
            alt={icon.alt}
            width={70}
            height={30}
            className="object-contain rounded-md"
          />
        </div>
      ))}
    </div>
  );
}
