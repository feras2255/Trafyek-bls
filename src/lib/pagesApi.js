import { supabase } from "@/lib/supabaseClient";

// get all pages
export async function getPages() {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// find page by slug
export async function getPageBySlug(slug) {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

// add new page
export async function addPage(page) {
  const { data, error } = await supabase.from("pages").insert([page]);
  if (error) throw error;
  return data;
}

// update page
export async function updatePage(id, updates) {
  const { data, error } = await supabase
    .from("pages")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
  return data;
}

// delete page
export async function deletePage(id) {
  const { error } = await supabase.from("pages").delete().eq("id", id);
  if (error) throw error;
}
