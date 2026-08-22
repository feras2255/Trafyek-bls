import { supabase } from "./supabaseClient";

const DEFAULT_SETTINGS = {
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
};

// يجلب صف الإعدادات الوحيد، وينشئه إن لم يكن موجوداً
export async function getSiteSettings() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("id", { ascending: true })
    .limit(1);

  if (error) throw error;
  if (data?.length) return data[0];

  const { data: created, error: insertError } = await supabase
    .from("site_settings")
    .insert([DEFAULT_SETTINGS])
    .select()
    .single();

  if (insertError) throw insertError;
  return created;
}

// يحدّث صف الإعدادات الحالي (بدون افتراض أن المعرّف = 1)
export async function updateSiteSettings(settings) {
  const current = await getSiteSettings();

  const { id, created_at, ...payload } = settings;

  const { data, error } = await supabase
    .from("site_settings")
    .update(payload)
    .eq("id", current.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// يرفع صورة إلى bucket الإعدادات ويعيد رابطها العام
export async function uploadImage(file) {
  const fileExt = file.name.split(".").pop();
  const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error } = await supabase.storage
    .from("site-images")
    .upload(filePath, file, { upsert: true, cacheControl: "3600" });

  if (error) throw error;

  // supabase-js v2 يعيد { data: { publicUrl } } وليس { publicURL }
  const { data } = supabase.storage.from("site-images").getPublicUrl(filePath);

  return data.publicUrl;
}
