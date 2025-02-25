import { UAParser } from "ua-parser-js";
import supabase from "./superbase";
export async function getClicks(url_id) {
  const { data: session, error } = await supabase
    .from("click")
    .select("*")
    .in("url_id", url_id);

  console.log(url_id);
  console.log("sessions of clicks", session);

  if (error) {
    console.log("error", error.message);
    throw new Error("Unable to load clicks");
  }
  return session;
}

//npm i uaparser-js
const parser = new UAParser();

//ipapi for location

export const storeclicks = async ({ id, originalUrl }) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop"; // Default to desktop if type is not detected

    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    // Record the click
    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });

    // Redirect to the original URL
    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error recording click:", error);
  }
};

export async function getClicksforUrls(url_id) {
  const { data, error } = await supabase
    .from("click")
    .select("*")
    .eq("url_id", url_id);

  console.log("data of clicks", data);

  if (error) {
    console.log("error", error.message);
    throw new Error("Unable to fetch clicks");
  }

  return data;
}
