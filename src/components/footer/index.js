import Image from "next/image";
import Link from "next/link";
import React from "react";
import PaymentIcons from "./PaymentIcons";
import ContactLinks from "./ContactLinks";
import SocialLinks from "./SocialLinks";

const links = [
  { id: 1, title: "الرئيسية", href: "/" },
  { id: 2, title: "عن الشركة", href: "/about" },
  { id: 3, title: "مشاريعنا", href: "/projects" },
  { id: 4, title: "خدماتنا", href: "/services" },
  { id: 5, title: "سياسة الخصوصية", href: "/privacy" },
  { id: 6, title: "اتصل بنا", href: "/contact" },
];
export default function Footer() {
  return (
    <footer className="bg-accent text-maintext mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <div>
              <Image
                src="/logow.png"
                alt="logo"
                width={400}
                height={80}
                className="mx-auto"
              />
            </div>
            <p className="mt-4 text-justify">
              مرحبًا بك في ترافيك بلس، وجهتك المتكاملة للخدمات المالية
              والإدارية! نحن متخصصون في تقديم حلول مبتكرة لتلبية احتياجات
              الأفراد والشركات، مع التركيز على الجودة والسرعة والموثوقية
            </p>
          </div>
          {/* quick links */}
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-primary">روابط سريعة</h3>
            <ul className="mt-6 grid grid-cols-2 gap-y-3 gap-x-6">
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-base md:text-md font-semibold text-maintext hover:text-secondary transition-colors duration-300"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact us */}
          <div className="mt-2">
            <h3 className="text-2xl font-bold text-primary">تواصل معنا</h3>
            <ContactLinks />
            <SocialLinks />
          </div>
          {/* saudia business center */}
          <div>
            <div className="w-1/2 flex mx-auto md:mt-20 bg-maintext rounded-2xl">
              <Image
                src="/saudia.png"
                alt="logo"
                width={400}
                height={80}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
        {/* copyright */}
        <div className="mt-8 pt-8 border-t border-gray-300 flex flex-col md:flex-row gap-y-4 items-center justify-between ">
          <PaymentIcons />
          {/* <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} ترافيك بلس</p> */}
          <div className="mt-4 text-center text-sm text-secondarytext">
            <p>
              جميع الحقوق محفوظة &copy; {new Date().getFullYear()} ترافيك بلس
            </p>
            <p>
              تم التطوير بواسطة{" "}
              <a
                href="https://your-portfolio-link.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:underline"
              >
                Abdelrahman
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
