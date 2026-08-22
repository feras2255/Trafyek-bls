import { supabase } from "@/lib/supabaseClient";

export async function siteSettings() {
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
  return data;
}
