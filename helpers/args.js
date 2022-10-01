/**
 *
 * @param {Array} args массив аргументов командной строки
 * @returns {{key:value}} объект пар ключ-значение
 */
export function parseArgs(args) {
  const parsedArgs = {};
  const tokens = args.join(" ").split("-").slice(1);

  tokens.forEach((token) => {
    const [arg, value] = token.trim().split(" ");
    parsedArgs[arg] = value || true;
  });

  return parsedArgs;
}

export const SETTINGS = {
  TOKEN: "API_token",
  CITY: "city",
};

export const ARGS = {
  HELP: "h",
  CITY: "s",
  TOKEN: "t",
};
