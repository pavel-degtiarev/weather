import { parseArgs } from "./helpers/args.js";
import { printHelp } from "./services/log.js";

const actions = {
  h: printHelp,
};

function init() {
  const args = parseArgs(process.argv);
  
  Object.keys(args).forEach(key => {
    if (key in actions) actions[key]();
  })
}

init();
