"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { addMessage } from "@/lib/contact";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
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
  return (
    <section className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-primary mb-6">تواصل معنا</h2>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-7/12">
          <form onSubmit={handleSubmit} action="" className="space-y-6">
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
            <div className="flex justify-center mt-4">
              <Button title={"ارسال"} color={"primary"} />
            </div>
          </form>
        </div>
        <div className="w-full md:w-5/12">
          <h1 className="text-3xl font-bold text-secondary mb-4">موقعنا</h1>

          <div className="text-maintext mt-4 space-y-2 text-lg">
            <p>الرياض المملكة العربية السعودية</p>
            <p>0530446151</p>
            <p>5M0b8@example.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
