// "use client";
// import MainTitle from "@/components/dashboard/MainTitle";
// import Input from "@/components/ui/input";
// import FileInput from "@/components/ui/FileInput";
// import Textarea from "@/components/ui/textarea";
// import {
//   getSiteSettings,
//   updateSiteSettings,
//   uploadImage,
// } from "@/lib/getSiteSettings";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// export default function Settings() {
//   const [settings, setSettings] = useState({
//     description: "",
//     image_url: "",
//     whatsapp: "",
//     phone: "",
//     email: "",
//     instagram: "",
//     tiktok: "",
//     snapchat: "",
//     x_account: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [uploadedImage, setUploadedImage] = useState(false);

//   // fetch settings on mount
//   useEffect(() => {
//     async function getSettings() {
//       try {
//         const data = await getSiteSettings();
//         setSettings({
//           description: data.description_ar || "",
//           image_url: data.image_url || "",
//           whatsapp: data.whatsapp || "",
//           phone: data.phone || "",
//           email: data.email || "",
//           instagram: data.instagram || "",
//           tiktok: data.tiktok || "",
//           snapchat: data.snapchat || "",
//           x_account: data.x_account || "",
//         });
//       } catch (error) {
//         console.log("error fetching settings", error.message);
//       }
//     }

//     getSettings();
//   }, []);

//   const handleImageUpload = async (file) => {
//     if (!file) return;
//     setUploadedImage(true);
//     try {
//       const imageUrl = await uploadImage(file); // uploadImage كما صممناها
//       setSettings({ ...settings, image_url: imageUrl });
//     } catch (error) {
//       console.log("error uploading image", error.message);
//     }
//     setUploadedImage(false);
//   };

//   // update settings
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await updateSiteSettings(settings);
//       toast("تم تحديث الاعدادات بنجاح");
//     } catch (error) {
//       toast("فشل تحديث الاعدادات");
//       console.log("error updating settings", error.message);
//     }
//     setLoading(false);
//   };
//   return (
//     <div>
//       <MainTitle title="الاعدادات" />
//       <form onSubmit={handleSubmit} className="space-y-4 mt-4">
//         <Textarea
//           placeholder="وصف الموقع"
//           value={settings.description}
//           onChange={(e) =>
//             setSettings({ ...settings, description: e.target.value })
//           }
//         />
//         <Input
//           type="text"
//           placeholder="رقم الواتساب"
//           value={settings.whatsapp}
//           onChange={(e) =>
//             setSettings({ ...settings, whatsapp: e.target.value })
//           }
//         />
//         <Input
//           type="text"
//           placeholder="رقم الهاتف"
//           value={settings.phone}
//           onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
//         />
//         <Input
//           type="email"
//           placeholder="الايميل"
//           value={settings.email}
//           onChange={(e) => setSettings({ ...settings, email: e.target.value })}
//         />
//         <Input
//           type="text"
//           placeholder="رابط الانستقرام"
//           value={settings.instagram}
//           onChange={(e) =>
//             setSettings({ ...settings, instagram: e.target.value })
//           }
//         />
//         <Input
//           type="text"
//           placeholder="رابط التيكتوك"
//           value={settings.tiktok}
//           onChange={(e) => setSettings({ ...settings, tiktok: e.target.value })}
//         />
//         <Input
//           type="text"
//           placeholder="رابط السنابشات"
//           value={settings.snapchat}
//           onChange={(e) =>
//             setSettings({ ...settings, snapchat: e.target.value })
//           }
//         />
//         <Input
//           type="text"
//           placeholder="رابط X"
//           value={settings.x_account}
//           onChange={(e) =>
//             setSettings({ ...settings, x_account: e.target.value })
//           }
//         />

//         <FileInput
//           setImage={handleImageUpload}
//           initialImage={settings.image_url}
//         />
//         <button
//           type="submit"
//           className="bg-primary text-text py-2.5 px-4 rounded-md font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-300 cursor-pointer"
//         >
//           {loading ? "جاري التحديث..." : "تحديث الاعدادات"}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";
import MainTitle from "@/components/dashboard/MainTitle";
import Input from "@/components/ui/input";
import FileInput from "@/components/ui/FileInput";
import Textarea from "@/components/ui/textarea";
import {
  getSiteSettings,
  updateSiteSettings,
  uploadImage,
} from "@/lib/getSiteSettings";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Settings() {
  const [settings, setSettings] = useState({
    description_ar: "",
    description_en: "",
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
  const [fetching, setFetching] = useState(true);
  const [uploadedImage, setUploadedImage] = useState(false);

  useEffect(() => {
    async function getSettings() {
      try {
        const data = await getSiteSettings();
        setSettings({
          description_ar: data.description_ar || "",
          description_en: data.description_en || "",
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
        toast("فشل تحميل الاعدادات");
      } finally {
        setFetching(false);
      }
    }

    getSettings();
  }, []);

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploadedImage(true);
    try {
      const imageUrl = await uploadImage(file);
      setSettings((prev) => ({ ...prev, image_url: imageUrl }));
    } catch (error) {
      console.log("error uploading image", error.message);
      toast("فشل رفع الصورة");
    } finally {
      setUploadedImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateSiteSettings(settings);
      toast("تم تحديث الاعدادات بنجاح");
    } catch (error) {
      toast("فشل تحديث الاعدادات");
      console.log("error updating settings", error.message);
    } finally {
      setLoading(false);
    }
  };

  const field = (key, val) => setSettings((prev) => ({ ...prev, [key]: val }));

  if (fetching) {
    return (
      <div dir="rtl" className="p-4">
        <MainTitle title="الاعدادات" />
        <div className="mt-6 space-y-4 animate-pulse">
          <div className="h-24 bg-gray-200 rounded-md" />
          <div className="h-10 bg-gray-200 rounded-md" />
          <div className="h-10 bg-gray-200 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="p-4">
      <MainTitle title="الاعدادات" />

      <form onSubmit={handleSubmit} className="mt-6 space-y-8 max-w-3xl">
        {/* بيانات الموقع */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-text border-b pb-2">
            بيانات الموقع
          </h2>
          <Textarea
            placeholder="وصف الموقع (بالعربية)"
            value={settings.description_ar}
            onChange={(e) => field("description_ar", e.target.value)}
          />
          <Textarea
            placeholder="Site description (English)"
            value={settings.description_en}
            onChange={(e) => field("description_en", e.target.value)}
          />
          <FileInput
            setImage={handleImageUpload}
            initialImage={settings.image_url}
            loading={uploadedImage}
          />
        </section>

        {/* بيانات التواصل */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-text border-b pb-2">
            بيانات التواصل
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="رقم الواتساب"
              value={settings.whatsapp}
              onChange={(e) => field("whatsapp", e.target.value)}
            />
            <Input
              type="text"
              placeholder="رقم الهاتف"
              value={settings.phone}
              onChange={(e) => field("phone", e.target.value)}
            />
            <Input
              type="email"
              placeholder="الايميل"
              value={settings.email}
              onChange={(e) => field("email", e.target.value)}
              className="sm:col-span-2"
            />
          </div>
        </section>

        {/* مواقع التواصل الاجتماعي */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-text border-b pb-2">
            مواقع التواصل الاجتماعي
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="رابط الانستقرام"
              value={settings.instagram}
              onChange={(e) => field("instagram", e.target.value)}
            />
            <Input
              type="text"
              placeholder="رابط التيكتوك"
              value={settings.tiktok}
              onChange={(e) => field("tiktok", e.target.value)}
            />
            <Input
              type="text"
              placeholder="رابط السنابشات"
              value={settings.snapchat}
              onChange={(e) => field("snapchat", e.target.value)}
            />
            <Input
              type="text"
              placeholder="رابط منصة X"
              value={settings.x_account}
              onChange={(e) => field("x_account", e.target.value)}
            />
          </div>
        </section>

        <button
          type="submit"
          disabled={loading || uploadedImage}
          className="bg-primary text-text py-2.5 px-6 rounded-md font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {loading ? "جاري التحديث..." : "تحديث الاعدادات"}
        </button>
      </form>
    </div>
  );
}
