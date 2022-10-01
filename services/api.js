import axios from "axios";
import { SETTINGS } from "../helpers/args.js";
import { readKeyValue } from "./storage.js";

/**
 *
 * @returns {} Объект с данными о погоде
 */
export async function getWeather() {
  const token = await readKeyValue(SETTINGS.TOKEN);
  if (!token) throw new Error("В настройках не найден API token!");

  const city = await readKeyValue(SETTINGS.CITY);
  if (!city) throw new Error("В настройках не указан город!");

  const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: { q: city, appid: token, lang: "ru", units: "metric" },
  });

  return data;
}
