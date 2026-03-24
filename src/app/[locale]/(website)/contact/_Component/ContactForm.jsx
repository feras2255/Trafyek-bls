"use client";

import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { addMessage } from "@/lib/contact";
import { useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
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
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("فشل ارسال الرسالة");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        type="text"
        placeholder="الاسم"
        value={form.name}
        onChange={handleChange}
      />
      <Input
        name="email"
        type="email"
        placeholder="الايميل"
        value={form.email}
        onChange={handleChange}
      />
      <Input
        name="phone"
        type="number"
        placeholder="الجوال"
        value={form.phone}
        onChange={handleChange}
      />
      <Textarea
        name="message"
        placeholder="الرسالة"
        value={form.message}
        onChange={handleChange}
      />

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          إرسال الرسالة الآن
        </button>
      </div>
    </form>
  );
}
