import { ARGS, parseArgs, SETTINGS } from "./helpers/args.js";
import { getWeather } from "./services/api.js";
import { printError, printHelp, printSuccess } from "./services/log.js";
import { saveKeyValue } from "./services/storage.js";

const actions = {
  [ARGS.HELP]: () => printHelp(),
  [ARGS.TOKEN]: (value) => saveSetting(SETTINGS.TOKEN, value),
  [ARGS.CITY]: (value) => saveSetting(SETTINGS.CITY, value),
};

async function init() {
  const args = parseArgs(process.argv);
  const argKeys = Object.keys(args);

  // если аргументов нет, выводим погоду и выходим
  if (argKeys.length === 0) {
    const data = await getWeather();
    console.log(data);
    return;
  }

  // если аргументы есть, сохраняем их
  argKeys.forEach((key) => {
    if (key in actions) actions[key](args[key]);
  });
}

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

init();
