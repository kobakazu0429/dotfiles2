import { exec } from "./exec.ts";
import { exitCommandNotFound } from "./exit.ts";
import { log } from "./logger.ts";

type WhichCache = Record<string, boolean>;
const KEY = "which";

export const which = (command: string, exit = false) => {
  const cache: WhichCache = JSON.parse(sessionStorage.getItem(KEY) ?? "{}");
  if (cache[command]) {
    return cache[command];
  }
  const result = exec(
    "which",
    {
      args: [command],
    },
    true
  );

  cache[command] = result.status;
  sessionStorage.setItem(KEY, JSON.stringify(cache));

  if (result.status) {
    log.debug(`${command} is exist.`);
  } else {
    log.debug(`${command} is not exist.`);
    if (exit) {
      exitCommandNotFound();
    }
  }

  return result.status;
};
