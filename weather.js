import { parseArgs } from "./helpers/args.js";

function init() {
  const args = parseArgs(process.argv);
  console.log(args);
}

init();
