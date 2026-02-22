import { supabase } from "./supabaseClient";

export async function getSiteSettings() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .limit(1);

  if (error) throw error;

  if (data.length > 0) return data[0];

  const { data: newData } = await supabase
    .from("site_settings")
    .insert([
      {
        description: "",
        image_url: "",
        whatsapp: "",
        phone: "",
        email: "",
        instagram: "",
        tiktok: "",
        snapchat: "",
        x_account: "",
      },
    ])
    .select();

  return newData[0];
}

// update site settings
export async function updateSiteSettings(settings) {
  const { data, error } = await supabase
    .from("site_settings")
    .update(settings)
    .eq("id", 1)
    .select();
  if (error) throw error;
  return data;
}

// upload image to supabase
export async function uploadImage(file) {
  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { data, error } = await supabase.storage
    .from("site-images")
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  // Get the public URL
  const { publicURL, error: urlError } = supabase.storage
    .from("site-images")
    .getPublicUrl(filePath);

  if (urlError) throw urlError;

  return publicURL;
}
