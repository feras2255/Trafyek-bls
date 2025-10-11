"use client";

import { useEffect, useState } from "react";
import { deletePage, getPages } from "@/lib/pagesApi";
import Button from "@/components/ui/button";
import MainTitle from "@/components/dashboard/MainTitle";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import Link from "next/link";

export default function PagesDashboard() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);

  // get all pages
  useEffect(() => {
    fetchPages();
  }, []);

  async function fetchPages() {
    setLoading(true);
    try {
      const data = await getPages();
      setPages(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function handleDelete(id) {
    if (confirm("هل أنت متأكد من حذف هذه الصفحة؟")) {
      await deletePage(id);
      await fetchPages();
    }
  }

  return (
    <section className="py-4">
      <div className="container mx-auto px-4 ">
        <TitleWithBack
          title="إدارة المنتجات"
          url="/dashboard/pages/add"
          textBtn="إضافة صفحة"
        />
        {/* pages table */}
        <div className="bg-card p-4 mt-8 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">قائمة الصفحات</h2>
          {loading ? (
            <p>جاري التحميل...</p>
          ) : pages.length === 0 ? (
            <p>لا توجد صفحات مضافة بعد.</p>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100 text-right">
                  <th className="p-2">العنوان</th>
                  <th className="p-2">الرابط</th>
                  <th className="p-2 text-center">التحكم</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((page) => (
                  <tr key={page.id} className="border-t">
                    <td className="p-2">{page.title}</td>
                    <td className="p-2 text-gray-600">{page.slug}</td>
                    <td className="p-2 flex justify-center gap-2">
                      <Link
                        href={`/dashboard/pages/edit/${page.id}`}
                        className="flex items-center bg-secondary text-maintext px-8 rounded-md hover:bg-primary transition-colors duration-300"
                      >
                        تعديل
                      </Link>

                      <Button
                        type="submit"
                        title={"حذف"}
                        color="destructive"
                        onClick={() => handleDelete(page.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
