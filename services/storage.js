import { homedir } from "os";
import { join } from "path";
import { promises } from "fs";

const SETTINGS_FILE_NAME = "weather-data.json";
const settingsPath = join(homedir(), SETTINGS_FILE_NAME);

/**
 * 
 * @param {string} key Ключ настройки
 * @param {string} value Значение настройки
 */
export async function saveKeyValue(key, value) {
  const settings = await readSettingsFile(settingsPath);
  settings[key] = value;
  await promises.writeFile(settingsPath, JSON.stringify(settings));
}

/**
 * 
 * @param {string} key Ключ, которы йнужно прочитаить
 * @returns {string} Значение ключа
 */
export async function readKeyValue(key) {
  const settings = await readSettingsFile(settingsPath);
  return settings[key];
}

/**
 * 
 * @param {string} path Путь к файлу настроек
 * @returns {{key:value}} Объект с настройками. Если файла настроек нет, то пустой объект. 
 */
async function readSettingsFile(path) {
  let settings = {};
  if (await isExist(path)) {
    const raw = await promises.readFile(path);
    settings = JSON.parse(raw);
  }
  return settings;
}

async function isExist(path) {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
}
