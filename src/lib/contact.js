import { supabase } from "./supabaseClient";

// add message
export async function addMessage({ name, email, phone, message }) {
  const { data, error } = await supabase
    .from("contact_messages")
    .insert([{ name, email, phone, message }])
    .select();

  if (error) throw error;
  return data;
}

// get all messages
export async function getMessages() {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

// get single message by id
export async function getMessageById(id) {
  const { data, error } = await supabase
    .from("contact_messages")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}
