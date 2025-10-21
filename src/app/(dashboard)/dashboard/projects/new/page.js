"use client";
import { useEffect, useState } from "react";
import Input from "@/components/ui/input";
import { toast } from "sonner";
import TitleWithBack from "@/components/dashboard/TitleWithBack";
import FileInput from "@/components/ui/FileInput";
import Button from "@/components/ui/button";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/dashboard/rich-text-editor";

export default function AddProject() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectLink: "",
    category_id: "",
  });
  const [image, setImage] = useState(null);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, title");
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (eOrHtml) => {
    // if it's input or textarea
    if (eOrHtml?.target) {
      const { name, value } = eOrHtml.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // if it's RichTextEditor
    else {
      setFormData((prev) => ({
        ...prev,
        description: eOrHtml,
      }));
    }
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

    const { error } = await supabase.from("projects").insert({
      title: formData.title,
      description: formData.description,
      project_link: formData.projectLink,
      image_url: imageUrl,
      category_id: formData.category_id,
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
      category_id: "",
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

        <RichTextEditor onChange={handleChange} />
        <Input
          type="text"
          name="projectLink"
          placeholder="رابط المشروع"
          value={formData.projectLink}
          onChange={handleChange}
        />

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
        >
          <option value="">اختر التصنيف</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>

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
