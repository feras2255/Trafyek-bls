"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getMessageById } from "@/lib/contact";
import Button from "@/components/ui/button";
import MainTitle from "@/components/dashboard/MainTitle";

export default function MessageDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchMessage() {
      try {
        const data = await getMessageById(id);
        setMessage(data);
      } catch (err) {
        console.error("Error fetching message", err.message);
      }
    }
    fetchMessage();
  }, [id]);

  if (!message) {
    return (
      <div className="">
        <p className="text-lg text-fourth text-center py-10">
          جاري تحميل الرسالة...
        </p>
      </div>
    );
  }

  return (
    <div>
      <MainTitle title=" تفاصيل الرسالة" />

      <div className="bg-card px-6 pt-6 mt-12 rounded-md space-y-4">
        <p className="text-lg text-fourth font-bold">
          <span className="text-xl ml-4">الاسم:</span> {message.name}
        </p>
        <p className="text-lg text-fourth font-bold">
          <span className="text-xl ml-4">الايميل:</span> {message.email}
        </p>
        <p className="text-lg text-fourth font-bold">
          <span className="text-xl ml-4">الجوال:</span> {message.phone}
        </p>
        <p className="text-lg text-fourth font-bold">
          <span className="text-xl ml-4">الرسالة:</span> {message.message}
        </p>
        <p className="text-md text-fourthtext font-semibold mx-4">
          التاريخ: {new Date(message.created_at).toLocaleDateString("ar-EG")} -{" "}
          {new Date(message.created_at).toLocaleTimeString("ar-EG")}
        </p>
        <div className="flex justify-end pb-3">
          <Button
            title="العودة ⬅"
            onClick={() => router.push("/dashboard/messages")}
            aria-label="العودة"
          />
        </div>
      </div>
    </div>
  );
}
