import { MessageCircle, Phone, Mail } from "lucide-react";

export default function ContactLinks() {
  return (
    <div className="flex items-center justify-center gap-x-2 md:gap-x-4 mt-6">
      <a
        href="https://wa.me/996530446151"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-x-2 mb-2 bg-background px-2 py-1 rounded-md hover:bg-card transition-colors duration-300 ease-in-out"
      >
        <MessageCircle size={24} />
        <span>واتساب</span>
      </a>

      <a
        href="tel:0530446151"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-x-2 mb-2 bg-background px-2 py-1 rounded-md hover:bg-card transition-colors duration-300 ease-in-out"
      >
        <Phone size={24} />
        <span>جوال</span>
      </a>

      <a
        href="mailto:wadhalogistics@gmail.com"
        className="flex items-center gap-x-2 mb-2 bg-background px-2 py-1 rounded-md hover:bg-card transition-colors duration-300 ease-in-out"
      >
        <Mail size={24} />
        <span>ايميل</span>
      </a>
    </div>
  );
}
