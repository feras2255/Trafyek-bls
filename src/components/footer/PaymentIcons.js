import Image from "next/image";

export default function PaymentIcons() {
  const icons = [
    { src: "/pay/stc.png", alt: "stc" },
    { src: "/pay/master.png", alt: "MasterCard" },
    { src: "/pay/mada.png", alt: "Mada" },
    { src: "/pay/apple.png", alt: "Apple Pay" },
    { src: "/pay/tabby.png", alt: "tabby" },
    { src: "/pay/tamara.png", alt: "tamara" },
  ];

  return (
    <div className="flex gap-2 mg:gap-4 items-center">
      {icons.map((icon, index) => (
        <div key={index} className="bg-maintext p-1 rounded-md md:rounded-lg">
          <Image
            src={icon.src}
            alt={icon.alt}
            width={70}
            height={30}
            className="object-contain"
          />
        </div>
      ))}
    </div>
  );
}
