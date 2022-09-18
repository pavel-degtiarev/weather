import { parseArgs } from "./helpers/args.js";
import { printHelp } from "./services/log.js";
import { saveKeyValue } from "./services/storage.js";

const actions = {
  h: printHelp,
  t: (value) => saveKeyValue("API_token", value),
};

function init() {
  const args = parseArgs(process.argv);

  Object.keys(args).forEach((key) => {
    if (key in actions) actions[key](args[key]);
  });
}

init();
