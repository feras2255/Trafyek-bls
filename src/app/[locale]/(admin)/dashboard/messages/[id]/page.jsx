"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { getMessageById } from "@/lib/contact";
import Button from "@/components/ui/button";
import MainTitle from "@/components/dashboard/MainTitle";

export default function MessageDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchMessage() {
      try {
        const data = await getMessageById(id);
        setMessage(data);
      } catch (err) {
        console.error("Error fetching message", err);
        setError("تعذّر تحميل الرسالة.");
      }
    }
    fetchMessage();
  }, [id]);

  if (error) {
    return <p className="text-lg text-destructive text-center py-10">{error}</p>;
  }

  // كان `return;` مبكراً يمنع ظهور حالة التحميل تماماً
  if (!message) {
    return (
      <p className="text-lg text-fourth text-center py-10">
        جاري تحميل الرسالة...
      </p>
    );
  }

  const createdAt = new Date(message.created_at);

  return (
    <div>
      <MainTitle title="تفاصيل الرسالة" />

      <div className="bg-card px-6 pt-6 mt-12 rounded-md space-y-4">
        <p className="text-lg text-fourth font-bold">
          <span className="text-xl ml-4">الاسم:</span> {message.name}
        </p>
        <p className="text-lg text-fourth font-bold">
          <span className="text-xl ml-4">الايميل:</span>{" "}
          <a href={`mailto:${message.email}`} className="underline" dir="ltr">
            {message.email}
          </a>
        </p>
        <p className="text-lg text-fourth font-bold">
          <span className="text-xl ml-4">الجوال:</span>{" "}
          <a href={`tel:${message.phone}`} className="underline" dir="ltr">
            {message.phone}
          </a>
        </p>
        <p className="text-lg text-fourth font-bold whitespace-pre-wrap">
          <span className="text-xl ml-4">الرسالة:</span> {message.message}
        </p>
        <p className="text-md text-fourthtext font-semibold mx-4">
          التاريخ: {createdAt.toLocaleDateString("ar-EG")} -{" "}
          {createdAt.toLocaleTimeString("ar-EG")}
        </p>
        <div className="flex justify-end pb-3">
          <Button
            title="العودة ⬅"
            onClick={() => router.push("/dashboard/messages")}
          />
        </div>
      </div>
    </div>
  );
}
