import { parseArgs } from "./helpers/args.js";
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

function init() {
  const args = parseArgs(process.argv);

  Object.keys(args).forEach((key) => {
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
