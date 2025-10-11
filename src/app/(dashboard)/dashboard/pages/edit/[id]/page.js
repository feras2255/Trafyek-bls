"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import { addPage } from "@/lib/pagesApi";

export default function PageForm() {
  const params = useParams();
  const router = useRouter();
  const pageId = params?.id;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (pageId) {
      setIsEdit(true);
      fetchPage();
    }
  }, [pageId]);

  async function fetchPage() {
    setLoading(true);
    try {
      const data = await getPageById(pageId);
      if (data) setFormData(data);
    } catch (err) {
      console.error("خطأ في جلب الصفحة:", err);
    }
    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await updatePage(pageId, formData);
        alert("تم حفظ التعديلات بنجاح ✅");
      } else {
        await addPage(formData);
        alert("تمت الإضافة بنجاح ✅");
      }
      router.push("/dashboard/pages");
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الحفظ ❌");
    }

    setLoading(false);
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        {isEdit ? "تعديل الصفحة" : "إضافة صفحة جديدة"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-3 bg-white p-4 rounded-xl shadow"
      >
        <Input
          placeholder="عنوان الصفحة"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <Input
          placeholder="الرابط (slug)"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
        <Textarea
          placeholder="محتوى الصفحة"
          rows={6}
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          required
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/pages")}
          >
            إلغاء
          </Button>
          <Button type="submit" color="primary" title="حفظ" loading={loading} />
        </div>
      </form>
    </div>
  );
}
