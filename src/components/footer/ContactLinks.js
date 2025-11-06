import { MessageCircle, Phone, Mail } from "lucide-react";

export default function ContactLinks({ links }) {
  return (
    <div className="flex items-center justify-center gap-x-2 md:gap-x-4 mt-6">
      <a
        href={`https://wa.me/${links.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-x-2 mb-2 bg-input px-2 py-1 rounded-md hover:bg-secondarytext/40 transition-colors duration-300 ease-in-out"
      >
        <MessageCircle size={24} />
        <span>واتساب</span>
      </a>

      <a
        href={`tel:${links.phone}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-x-2 mb-2 bg-input px-2 py-1 rounded-md hover:bg-secondarytext/40 transition-colors duration-300 ease-in-out"
      >
        <Phone size={24} />
        <span>جوال</span>
      </a>

      <a
        href={`mailto:${links.email}`}
        className="flex items-center gap-x-2 mb-2 bg-input px-2 py-1 rounded-md hover:bg-secondarytext/40 transition-colors duration-300 ease-in-out"
      >
        <Mail size={24} />
        <span>ايميل</span>
      </a>
    </div>
  );
}
