"use client";
import { useSiteSettings } from "@/app/context/SiteSettingsContext";
import Hero from "@/components/home/Hero";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { addMessage } from "@/lib/contact";
import { useState } from "react";
import { FaLocationDot, FaPhoneFlip } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "sonner";

export default function Contact() {
  const settings = useSiteSettings();
  const contactInfo = [
    {
      icon: <FaPhoneFlip size={22} />,
      title: "واتساب",
      value: settings?.settings?.phone,
    },
    {
      icon: <MdOutlineEmail size={22} />,
      title: "الايميل",
      value: settings?.settings?.email,
    },
    {
      icon: <FaPhoneFlip size={22} />,
      title: "الهاتف",
      value: settings?.settings?.phone,
    },
    {
      icon: <FaLocationDot size={22} />,
      title: "العنوان",
      value: "الرياض، المملكة العربية السعودية",
    },
  ];

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addMessage(form);
      toast.success("تم ارسال الرسالة بنجاح");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      toast.error("فشل ارسال الرسالة");
    }
  };

  if (!settings) return null;
  return (
    <section>
      <Hero
        title="سعداء بتواصلك معنا!"
        description={["فريقنا جاهز للرد عليك في أي وقت"]}
        buttonLink="#contact"
      />
      <div id="contact" className="">
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-7/12">
              <form onSubmit={handleSubmit} action="" className="space-y-4">
                <Input
                  name={"name"}
                  type={"text"}
                  placeholder="الاسم"
                  value={form.name}
                  onChange={handleChange}
                />
                <Input
                  name={"email"}
                  type={"email"}
                  placeholder="الايميل"
                  value={form.email}
                  onChange={handleChange}
                />
                <Input
                  name={"phone"}
                  type={"number"}
                  placeholder="الجوال"
                  value={form.phone}
                  onChange={handleChange}
                />
                <Textarea
                  name={"message"}
                  placeholder="الرسالة"
                  value={form.message}
                  onChange={handleChange}
                />
                <div className="flex justify-center">
                  <Button title={"ارسال"} color={"fourth"} size={"full"} />
                </div>
              </form>
            </div>
            <div className="w-full md:w-5/12 p-4 md:mt-10">
              <h1 className="inline-block text-3xl font-bold text-fourth border-b border-third pb-2 mb-4">
                معلومات التواصل
              </h1>

              <p className="text-primary mb-4 md:mb-8">
                يسعدنا استقبال استفساراتكم واقتراحاتكم في أي وقت. فريقنا ملتزم
                بالرد السريع على جميع الرسائل.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {contactInfo.map((info, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="bg-fourth/90 p-3 rounded-lg text-maintext">
                      {info.icon}
                    </div>
                    <div className="flex flex-col">
                      <h4 className="text-fourth font-bold">{info.title}</h4>
                      <p className="text-primary font-semibold">{info.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
