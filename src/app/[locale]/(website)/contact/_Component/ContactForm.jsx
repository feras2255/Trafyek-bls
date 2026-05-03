"use client";

import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { addMessage } from "@/lib/contact";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact.form");

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
      toast.success(t("success_msg"));
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error(t("error_msg"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="name"
        type="text"
        placeholder={t("placeholder_name")}
        value={form.name}
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        type="email"
        placeholder={t("placeholder_email")}
        value={form.email}
        onChange={handleChange}
        required
      />
      <Input
        name="phone"
        type="text"
        placeholder={t("placeholder_phone")}
        value={form.phone}
        onChange={handleChange}
        required
      />
      <Textarea
        name="message"
        placeholder={t("placeholder_message")}
        value={form.message}
        onChange={handleChange}
        required
      />

      <div className="flex justify-center">
        <button
          type="submit"
          aria-label={t("submit_button")}
          className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          {t("submit_button")}
        </button>
      </div>
    </form>
  );
}
