export function parseArgs(args) {
  const parsedArgs = {};
  const tokens = args.join(" ").split("-").slice(1);

  tokens.forEach(token => {
    const [arg, value] = token.trim().split(" ");
    parsedArgs[arg] = value || true;
  });

  return parsedArgs;
}
