import { homedir } from "os";

export function saveKeyValue(key, value) {
  console.log(homedir(), key, value);
}
