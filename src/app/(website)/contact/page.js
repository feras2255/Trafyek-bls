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
                  <Button title={"ارسال"} color={"primary"} size={"full"} />
                </div>
              </form>
            </div>
            <div className="w-full md:w-5/12  p-4 rounded-2xl">
              <h1 className="inline-block text-3xl font-bold text-secondary border-b border-secondary pb-2 mb-4">
                معلومات التواصل
              </h1>

              <div className="text-maintext  mt-4 space-y-4 text-lg">
                <p className="flex items-center gap-3 font-bold bg-input/80 p-4 rounded-lg">
                  <FaPhoneFlip />

                  {settings?.settings?.phone}
                </p>
                <p className="flex items-center gap-3 font-bold bg-input/80 p-4 rounded-lg">
                  <MdOutlineEmail />

                  {settings?.settings?.email}
                </p>
                <p className="flex items-center gap-3 font-bold bg-input/80 p-4 rounded-lg">
                  <FaLocationDot />
                  الرياض المملكة العربية السعودية
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
