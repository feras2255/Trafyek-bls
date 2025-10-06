"use client";
import { useState } from "react";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import { toast } from "sonner";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import FileInput from "@/components/ui/FileInput";
import Button from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AddProject() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectLink: "",
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // upload image to supabase storage
  const uploadImage = async () => {
    if (!image) return null;

    const fileName = `${Date.now()}_${image.name}`;

    // upload image
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("projects")
      .upload(fileName, image);

    if (uploadError) {
      console.error("Error uploading image:", uploadError);
      return null;
    }

    // get public url
    const { data } = supabase.storage.from("projects").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data: existingProjects, error: orderError } = await supabase
      .from("projects")
      .select("order")
      .order("order", { ascending: false })
      .limit(1);

    let nextOrder = 1;
    if (!orderError && existingProjects.length > 0) {
      nextOrder = (existingProjects[0].order || 0) + 1;
    }

    const imageUrl = await uploadImage();

    const { data, error } = await supabase.from("projects").insert({
      title: formData.title,
      description: formData.description,
      project_link: formData.projectLink,
      image_url: imageUrl,
      order: nextOrder,
    });

    if (error) {
      console.error("Error inserting project:", error);
      toast.error("حدث خطأ أثناء إضافة المشروع");
    } else {
      toast.success("تم إضافة المشروع بنجاح");
      router.push("/dashboard/projects");
    }

    setFormData({
      title: "",
      description: "",
      projectLink: "",
    });
    setImage(null);
  };

  return (
    <div>
      <TitleWithBack
        title="إضافة مشروع جديد"
        textBtn="رجوع"
        url="/dashboard/projects"
      />
      <form
        onSubmit={handleSubmit}
        className="bg-card p-6 rounded-lg space-y-4"
      >
        <Input
          type="text"
          name="title"
          placeholder="اسم المشروع"
          value={formData.title}
          onChange={handleChange}
        />
        <Textarea
          name="description"
          placeholder="وصف المشروع"
          value={formData.description}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="projectLink"
          placeholder="رابط المشروع"
          value={formData.projectLink}
          onChange={handleChange}
        />
        <FileInput setImage={setImage} />
        <Button
          title="اضافة المشروع"
          type="submit"
          color="secondary"
          size={"full"}
        />
      </form>
    </div>
  );
}
