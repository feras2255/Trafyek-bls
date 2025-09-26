"use client";
import MainTitle from "@/components/dashboard/MainTitle";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import FileInput from "@/components/ui/FileInput";
import Textarea from "@/components/ui/textarea";
import {
  getSiteSettings,
  updateSiteSettings,
  uploadImage,
} from "@/lib/siteSettings";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

export default function Settings() {
  const [settings, setSettings] = useState({
    description: "",
    image_url: "",
    whatsapp: "",
    phone: "",
    email: "",
    instagram: "",
    tiktok: "",
    snapchat: "",
    x_account: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(false);

  // fetch settings on mount
  useEffect(() => {
    async function getSettings() {
      try {
        const data = await getSiteSettings();
        setSettings({
          description: data.description || "",
          image_url: data.image_url || "",
          whatsapp: data.whatsapp || "",
          phone: data.phone || "",
          email: data.email || "",
          instagram: data.instagram || "",
          tiktok: data.tiktok || "",
          snapchat: data.snapchat || "",
          x_account: data.x_account || "",
        });
      } catch (error) {
        console.log("error fetching settings", error.message);
      }
    }

    getSettings();
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploadedImage(true);
    try {
      const imageUrl = await uploadImage(file); // uploadImage كما صممناها
      setSettings({ ...settings, image_url: imageUrl });
    } catch (error) {
      console.log("error uploading image", error.message);
    }
    setUploadedImage(false);
  };

  // update settings
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSiteSettings(settings);
      toast("تم تحديث الاعدادات بنجاح");
    } catch (error) {
      toast("فشل تحديث الاعدادات");
      console.log("error updating settings", error.message);
    }
    setLoading(false);
  };
  return (
    <div>
      <MainTitle title="الاعدادات" />
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <Textarea
          placeholder="وصف الموقع"
          value={settings.description}
          onChange={(e) =>
            setSettings({ ...settings, description: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="رقم الواتساب"
          value={settings.whatsapp}
          onChange={(e) =>
            setSettings({ ...settings, whatsapp: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="رقم الهاتف"
          value={settings.phone}
          onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
        />
        <Input
          type="email"
          placeholder="الايميل"
          value={settings.email}
          onChange={(e) => setSettings({ ...settings, email: e.target.value })}
        />
        <Input
          type="text"
          placeholder="رابط الانستقرام"
          value={settings.instagram}
          onChange={(e) =>
            setSettings({ ...settings, instagram: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="رابط التيكتوك"
          value={settings.tiktok}
          onChange={(e) => setSettings({ ...settings, tiktok: e.target.value })}
        />
        <Input
          type="text"
          placeholder="رابط السنابشات"
          value={settings.snapchat}
          onChange={(e) =>
            setSettings({ ...settings, snapchat: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="رابط X"
          value={settings.x_account}
          onChange={(e) =>
            setSettings({ ...settings, x_account: e.target.value })
          }
        />

        <FileInput
          setImage={handleImageUpload}
          initialImage={settings.image_url}
        />
        <Button type="submit" title="تحديث الاعدادات" color="primary" />
      </form>
    </div>
  );
}
