import axios from "axios";
import { SETTINGS } from "../helpers/args.js";
import { printError } from "./log.js";
import { readKeyValue } from "./storage.js";

export async function getWeather() {
  const token = await readKeyValue(SETTINGS.TOKEN);
  if (!token) {
    printError("API token не найден!");
    return;
  }

  const city = await readKeyValue(SETTINGS.CITY);
  if (!city) {
    printError("Город не указан!");
    return;
  }

  const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: { q: city, appid: token, lang: "ru", units: "metric" },
  });

  return data;
}
