"use client";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SortableTable from "@/components/dashboard/SortableTable";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useLocale } from "next-intl";

export default function Projects() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [projects, setProjects] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order", { ascending: true });

    if (error) {
      console.error("Error fetching projects", error);
      toast("فشل جلب المشاريع.");
    } else {
      setProjects(data || []);
    }
  };

  // update order
  const handleReorder = async (newProjects) => {
    setProjects(newProjects);

    try {
      for (let p of newProjects) {
        await supabase
          .from("projects")
          .update({ order: p.order })
          .eq("id", p.id);
      }
      toast("تم تحديث ترتيب المشاريع بنجاح.");
    } catch (err) {
      toast("فشل تحديث الترتيب.");
      console.error(err);
    }
  };

  // delete project
  const handleDelete = async (id) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast("فشل حذف المشروع.");
    } else {
      toast("تم حذف المشروع بنجاح.");
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

      <SortableTable
        items={projects}
        columns={["#", "الترتيب", "الصورة", "العنوان", "الوصف", "التحكم"]}
        onReorder={handleReorder}
        renderRow={(project, index) => (
          <>
            <td className="text-lg font-semibold">{project.order}</td>
            <td className="p-3">
              <Image
                src={project.image_url || "/default.png"}
                alt={project.title_ar || project.title_en}
                width={80}
                height={80}
                className="object-cover rounded mx-auto"
              />
            </td>
            <td className="text-maintext text-lg font-semibold">
              {isAr ? project.title_ar : project.title_en}
            </td>
            <td>
              <p className="truncate max-w-xs text-sm mx-auto text-maintext">
                {(isAr
                  ? project.description_ar
                  : project.description_en || project.description_ar || ""
                )
                  .replace(/<[^>]*>/g, "")
                  .substring(0, 120)}
              </p>
            </td>
            <td className="p-3 text-center space-x-2">
              <Link
                href={`/dashboard/projects/edit/${project.id}`}
                aria-label="تعديل"
                className="bg-fourth text-accent px-3 py-1 rounded"
              >
                تعديل
              </Link>
              <button
                onClick={() => {
                  setSelectedId(project.id);
                  setConfirmOpen(true);
                }}
                aria-label="حذف"
                className="bg-destructive text-worning px-3 py-1 rounded cursor-pointer"
              >
                حذف
              </button>
            </td>
          </>
        )}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="تأكيد الحذف"
        message="هل أنت متأكد من رغبتك في حذف هذا المشروع؟"
        onClose={() => {
          setConfirmOpen(false);
          setSelectedId(null);
        }}
        onConfirm={async () => {
          if (selectedId) {
            await handleDelete(selectedId);
            setConfirmOpen(false);
            setSelectedId(null);
          }
        }}
      />
    </section>
  );
}
