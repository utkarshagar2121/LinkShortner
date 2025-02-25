import { UAParser } from "ua-parser-js";
import supabase, { supabaseUrl } from "./superbase";
import { WindIcon } from "lucide-react";

export async function getUrls(user_id) {
  const { data: session, error } = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.log("error", error.message);
    throw new Error("Unable to fetch urls");
  }
  return session;
}

export async function deleteUrls(url_id) {
  const { data: session, error } = await supabase
    .from("urls")
    .delete()
    .eq("id", url_id);

  if (error) {
    console.log("error", error.message);
    throw new Error("Unable to fetch urls");
  }
  return session;
}

export async function createUrls(
  { title, long_url, customUrl, user_id },
  qrcode
) {
  console.log("qrcode", qrcode);
  console.log("long_url", long_url);
  console.log("title", title);
  const short = Math.random().toString(36).substring(2, 6);
  const filename = `qr-${short}`;
  const { error: storageError } = await supabase.storage
    .from("qr")
    .upload(filename, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/qr/${filename}`;

  const { data: session, error } = await supabase
    .from("urls")
    .insert([
      {
        title,
        original: long_url,
        custom_url: customUrl || null,
        user_id,
        short_url: short,
        qr,
      },
    ])
    .select();

  if (error) {
    console.log("error", error.message);
    throw new Error("Unable in creating urls");
  }
  return session;
}

export async function getLongUrl(id) {
  // Check if ID is numeric
  const isNumeric = !isNaN(id);

  const { data, error } = await supabase
    .from("urls")
    .select("id,original")
    .or(isNumeric ? `id.eq.${id}` : `short_url.eq.${id}`)
    .single();

  if (error) {
    console.log("error", error.message);
    throw new Error("Error fetching URLs");
  }

  return data;
}

export async function getUrlsforstats({ id, user_id }) {
  const { data, error } = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.log("error", error.message);
    throw new Error("Error fetching URLs");
  }

  return data;
}
