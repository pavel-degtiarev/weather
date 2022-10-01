import axios from "axios";
import { printError } from "./log.js";
import { readKeyValue } from "./storage.js";

export async function getWeather() {
  const token = await readKeyValue("API_token");
  if (!token) {
    printError("API token не найден!");
    return;
  }

  const city = await readKeyValue("city");
  if (!city) {
    printError("Город не указан!");
    return;
  }

  const { result } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: { q: city, appid: token, lang: "ru", units: "metric" },
  });

  return result;
}
