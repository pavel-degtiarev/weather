import { parseArgs } from "./helpers/args.js";
import { getWeather } from "./services/api.js";
import { printError, printHelp, printSuccess } from "./services/log.js";
import { saveKeyValue } from "./services/storage.js";

const actions = {
  h: () => printHelp(),
  t: (value) => {
    if (!value.length) {
      printError("Не передан Token");
      return;
    }
    saveSetting("API_token", value);
  },
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
  try {
    await saveKeyValue(key, value);
    printSuccess(`${key} сохранен.`);
  } catch (e) {
    printError(e.message);
  }
}

init();
