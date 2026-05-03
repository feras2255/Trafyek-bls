"use client";
import { useEffect, useState } from "react";
import { getMessages } from "@/lib/contact";
import MainTitle from "@/components/dashboard/MainTitle";
import Link from "next/link";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchMessages() {
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (error) {
        console.log("Error fetching messages:", error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  if (loading) return <p className="text-center mt-10">جاري التحميل...</p>;
  return (
    <div className="">
      <MainTitle title="رسائل التواصل" />
      {messages.length === 0 ? (
        <div className="text-center mt-28">
          <p className="text-2xl text-secondarytext">لا توجد رسائل حتى الآن.</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-4">
          {messages.map((msg) => (
            <Link
              key={msg.id}
              href={`/dashboard/messages/${msg.id}`}
              aria-label="الذهاب الي رساله معينه"
            >
              <div className="bg-card rounded-md py-4 grid grid-cols-3">
                <h1 className="text-2xl text-secondarytext font-semibold px-4 py-2 ">
                  {msg.name}
                </h1>
                <p className="text-xl text-secondarytext font-semibold px-4 py-2 ">
                  {msg.email}
                </p>
                <p className="text-secondarytext text-lg font-bold px-4 py-2">
                  {new Date(msg.created_at).toLocaleDateString("ar-EG")} -{" "}
                  {new Date(msg.created_at).toLocaleTimeString("ar-EG")}
                </p>
              </div>
            </Link>
          ))}
        </div>
        // <div className="overflow-x-auto mt-6">
        //   <table className="min-w-full border border-gray-200 rounded">
        //     <thead className="bg-gray-100">
        //       <tr>
        //         <th className="px-4 py-2 border">الاسم</th>
        //         <th className="px-4 py-2 border">الايميل</th>
        //         <th className="px-4 py-2 border">الجوال</th>
        //         <th className="px-4 py-2 border">الرسالة</th>
        //         <th className="px-4 py-2 border">التاريخ</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {messages.map((msg) => (
        //         <tr key={msg.id} className="text-center">
        //           <td className="px-4 py-2 border">{msg.name}</td>
        //           <td className="px-4 py-2 border">{msg.email}</td>
        //           <td className="px-4 py-2 border">{msg.phone}</td>
        //           <td className="px-4 py-2 border">{msg.message}</td>
        //           <td className="px-4 py-2 border">
        //             {new Date(msg.created_at).toLocaleString("ar-EG")}
        //           </td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </table>
        // </div>
      )}
    </div>
  );
}
