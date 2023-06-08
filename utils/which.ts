import { exec } from "./exec.ts";
import { exitCommandNotFound } from "./exit.ts";
import { log } from "./logger.ts";

type WhichCache = Record<string, boolean>;
const KEY = "which_command_result";

type Options = {
  exitIfNotFound: boolean;
};

export const which = async (
  command: string,
  options: Options = { exitIfNotFound: true }
) => {
  const cache: WhichCache = JSON.parse(sessionStorage.getItem(KEY) ?? "{}");
  if (cache[command]) {
    return cache[command];
  }
  const result = await exec(
    "which",
    {
      args: [command],
    },
    { streaming: false }
  );

  cache[command] = result.success;
  sessionStorage.setItem(KEY, JSON.stringify(cache));

  if (result.success) {
    log.debug(`${command} is exist. (${result.stdoutString?.trim()})`);
  } else {
    log.debug(`${command} is not exist.`);
    if (options.exitIfNotFound) {
      exitCommandNotFound();
    }
  }

  return result.success;
};
