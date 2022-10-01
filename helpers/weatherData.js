import chalk from "chalk";
import emoji from "node-emoji";

const PRESSURE_COEFF = 0.750064; // для пересчета гПа в мм. рт. ст.

const ICONS = {
  thermometer: emoji.get("thermometer"),

  sunny: emoji.get("sunny"),
  mostly_sunny: emoji.get("mostly_sunny"),
  partly_sunny: emoji.get("partly_sunny"),
  barely_sunny: emoji.get("barely_sunny"),
  cloud: emoji.get("cloud"),

  partly_sunny_rain: emoji.get("partly_sunny_rain"),

  rain: emoji.get("rain_cloud"),
  thunder: emoji.get("thunder_cloud_and_rain"),

  snow: emoji.get("snowflake"),
};

export function printWeatherData(data) {
  console.log("\n");
  console.log(chalk.bgBlueBright(`Погода в городе ${data.name}:`));
  console.log(`${getWeatherIcon(data.weather[0].id)}  Сейчас ${data.weather[0].description}.`);

  const temp = `Температура: ${Math.round(data.main.temp)}˚C`;
  const feel = `ощущается, как ${Math.round(data.main.feels_like)}˚C`;
  console.log(`${ICONS.thermometer}  ${temp}, ${feel}`);

  console.log(`Давление: ${Math.round(data.main.pressure * PRESSURE_COEFF)} мм. рт. ст.`);
  console.log(`Влажность: ${data.main.humidity}%`);

  data.wind.speed > 0
    ? console.log(`Ветер ${getWindDirection(data.wind.deg)}, ${data.wind.speed} м/с`)
    : console.log("Штиль");
  
  console.log("\n");
}

function getWeatherIcon(code) {
  switch (true) {
    case code >= 200 && code < 300:
      return ICONS.thunder;

    case code >= 300 && code < 600:
      return ICONS.rain;

    case code >= 600 && code < 700:
      return ICONS.snow;

    case code == 800:
      return ICONS.sunny;

    case code == 801:
      return ICONS.mostly_sunny;

    case code == 802:
      return ICONS.partly_sunny;

    case code == 803:
      return ICONS.barely_sunny;

    case code == 804:
      return ICONS.cloud;

    default:
      return "";
  }
}

function getWindDirection(deg) {
  const DIRECTION = {
    E: "восточный",
    NE: "северо-восточный",
    N: "северный",
    NW: "северо-западный",
    W: "западный",
    SW: "юго-западный",
    S: "южный",
    SE: "юго-восточный",
  };

  switch (true) {
    case deg <= 22.5 || deg > 337.5:
      return DIRECTION.E;
    case deg > 22.5 && deg <= 67.5:
      return DIRECTION.NE;
    case deg > 67.5 && deg <= 112.5:
      return DIRECTION.N;
    case deg > 112.5 && deg <= 157.5:
      return DIRECTION.NW;
    case deg > 157.5 && deg <= 202.5:
      return DIRECTION.W;
    case deg > 202.5 && deg <= 247.5:
      return DIRECTION.SW;
    case deg > 247.5 && deg <= 292.5:
      return DIRECTION.S;
    case deg > 292.5 && deg <= 337.5:
      return DIRECTION.SE;
  }
}
