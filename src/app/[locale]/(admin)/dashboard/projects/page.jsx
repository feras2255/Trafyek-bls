"use client";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SortableTable from "@/components/dashboard/SortableTable";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import { useLocale } from "next-intl";
import { localized } from "@/lib/localized";

const PLACEHOLDER = "/t-logo.webp";

const stripHtml = (html) => (html || "").replace(/<[^>]*>/g, "");

export default function Projects() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const [projects, setProjects] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [deleting, setDeleting] = useState(false);

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
      toast.error("فشل جلب المشاريع.");
      return;
    }
    setProjects(data || []);
  };

  const handleReorder = async (newProjects) => {
    const previous = projects;
    setProjects(newProjects);

    const results = await Promise.all(
      newProjects.map((p) =>
        supabase.from("projects").update({ order: p.order }).eq("id", p.id),
      ),
    );

    if (results.some((r) => r.error)) {
      setProjects(previous);
      toast.error("فشل تحديث الترتيب.");
      return;
    }
    toast.success("تم تحديث ترتيب المشاريع بنجاح.");
  };

  const handleDelete = async (id) => {
    setDeleting(true);
    const { error } = await supabase.from("projects").delete().eq("id", id);
    setDeleting(false);

    if (error) {
      toast.error("فشل حذف المشروع.");
      return;
    }
    toast.success("تم حذف المشروع بنجاح.");
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section className="mt-6">
      <TitleWithBack
        title="إدارة المشاريع"
        url="/dashboard/projects/new"
        textBtn="إضافة مشروع"
      />

      <SortableTable
        items={projects}
        columns={["#", "الترتيب", "الصورة", "العنوان", "الوصف", "التحكم"]}
        onReorder={handleReorder}
        renderRow={(project) => (
          <>
            <td className="text-lg font-semibold">{project.order}</td>
            <td className="p-3">
              <Image
                src={project.image_url || PLACEHOLDER}
                alt={project.title_ar || project.title_en || "project"}
                width={80}
                height={80}
                className="object-cover rounded mx-auto w-20 h-20"
              />
            </td>
            <td className="text-maintext text-lg font-semibold">
              {localized(project, "title", isAr)}
            </td>
            <td>
              <p className="truncate max-w-xs text-sm mx-auto text-maintext">
                {stripHtml(localized(project, "description", isAr)).substring(
                  0,
                  120,
                )}
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
                type="button"
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
          if (deleting) return;
          setConfirmOpen(false);
          setSelectedId(null);
        }}
        onConfirm={async () => {
          if (!selectedId || deleting) return;
          await handleDelete(selectedId);
          setConfirmOpen(false);
          setSelectedId(null);
        }}
      />
    </section>
  );
}
