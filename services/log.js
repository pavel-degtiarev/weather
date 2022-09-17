import chalk from "chalk";
import dedent from "dedent-js";

export const printError = (errMessage) => console.error(`${chalk.bgRed(" ERROR ")} ${errMessage}`);
export const printSuccess = (message) => console.log(`${chalk.bgGreen(" SUCCESS ")} ${message}`);
export const printHelp = () => {
  console.log(
    dedent`Без параматров - вывод погоды
    -h помощь
    -s CITY - установка города
    -t TOKEN - установка токена API`
  );
};
