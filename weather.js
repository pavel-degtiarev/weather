import { ARGS, parseArgs, SETTINGS } from "./helpers/args.js";
import { printWeatherData } from "./helpers/weatherData.js";
import { getWeather } from "./services/api.js";
import { printError, printHelp, printSuccess } from "./services/log.js";
import { saveKeyValue } from "./services/storage.js";

const actions = {
  [ARGS.HELP]: () => printHelp(),
  [ARGS.TOKEN]: (value) => saveSetting(SETTINGS.TOKEN, value),
  [ARGS.CITY]: (value) => saveSetting(SETTINGS.CITY, value),
};

async function saveSetting(key, value) {
  if (!value.length) {
    printError(`Не передан ${key}`);
    return;
  }

  try {
    await saveKeyValue(key, value);
    printSuccess(`${key} сохранен.`);
  } catch (e) {
    printError(e.message);
  }
}

// ==========================================

async function main() {
  const args = parseArgs(process.argv);
  const argKeys = Object.keys(args);

  // если аргументов нет, выводим погоду и выходим
  if (argKeys.length === 0) {
    try {
      const data = await getWeather();
      printWeatherData(data);

    } catch (error) {
      switch (error.response?.status) {
        case 404:
          printError("Неверно указан город!");
          break;

        case 401:
          printError("Неверно указан токен!");
          break;

        default:
          printError(error.message);
          break;
      }
    }

    return;
  }

  // если аргументы есть, сохраняем их
  argKeys.forEach((key) => {
    if (key in actions) actions[key](args[key]);
  });
}

main();
