"use client";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from("projects").select("*");
      if (error) {
        console.error("Error fetching projects", error);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast("فشل حذف المنتج.");
    } else {
      toast("تم حذف المنتج بنجاح.");
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <section className="mt-6">
      <TitleWithBack
        title="إدارة المشاريع"
        url="/dashboard/projects/new"
        textBtn={"إضافة مشروع"}
      />

      {projects.length > 0 ? (
        <div className="overflow-x-auto w-full mt-6">
          <table className="w-full min-w-[400px] bg-card shadow rounded-md border border-border overflow-hidden">
            <thead className="bg-sidebar-primary text-maintext text-center">
              <tr>
                <th className="p-3">الصورة</th>
                <th className="p-3">العنوان</th>
                <th className="p-3">الوصف</th>
                <th className="p-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr
                  key={p.id}
                  className="border text-maintext font-semibold text-center"
                >
                  <td className="p-3">
                    <Image
                      src={p.image_url}
                      alt={p.title}
                      width={80}
                      height={80}
                      className="object-cover rounded"
                    />
                  </td>
                  <td className="p-3">{p.title}</td>
                  <td className="p-3">
                    <p className="truncate max-w-xs text-sm mx-auto">
                      {p.description}
                    </p>
                  </td>
                  <td className="p-3 space-x-2">
                    <Link
                      href={`/dashboard/projects/edit/${p.id}`}
                      className="bg-primary text-maintext px-3 py-1 rounded"
                    >
                      تعديل
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-destructive text-maintext px-3 py-1 rounded cursor-pointer"
                    >
                      حذف
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center mt-44">
          <p className=" text-3xl text-primary font-bold">لا يوجد منتجات</p>
        </div>
      )}
    </section>
  );
}
