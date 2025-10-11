"use client";

import { useState } from "react";
import { addPage } from "@/lib/pagesApi";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await addPage(formData);
      setFormData({ title: "", slug: "", content: "" });
      toast("تمت الإضافة بنجاح ✅");
      router.push("/dashboard/pages");
    } catch (err) {
      toast("حدث خطأ أثناء الإضافة");
    }
    setLoading(false);
  }

  return (
    <div>
      <div className="container mx-auto px-4 ">
        <TitleWithBack
          title="اضافة صفحة"
          url="/dashboard/pages/add"
          textBtn="رجوع"
        />

        <form
          onSubmit={handleSubmit}
          className="space-y-3 bg-card p-4 rounded-lg border border-border shadow"
        >
          <Input
            placeholder="عنوان الصفحة"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
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
          <div className="flex justify-end">
            <Button
              type="submit"
              title={loading ? "جاري الحفظ..." : "حفظ"}
              color="primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
