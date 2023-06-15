import { execute } from "./execute.ts";
import { exitCommandNotFound } from "./exit.ts";
import { log } from "./logger.ts";

type WhichCache = Record<string, boolean>;
const KEY = "which_command_result";

type Options = {
  exitIfNotFound: boolean;
};

export const which = (
  command: string,
  options: Options = { exitIfNotFound: true }
) => {
  const cache: WhichCache = JSON.parse(sessionStorage.getItem(KEY) ?? "{}");
  if (cache[command]) {
    return cache[command];
  }
  const result = execute("which", command, { streaming: false });

  cache[command] = result.success;
  sessionStorage.setItem(KEY, JSON.stringify(cache));

  if (result.success) {
    log.debug(result.stdoutString?.trim());
  } else {
    log.debug(`${command} is not exist.`);
    if (options.exitIfNotFound) {
      exitCommandNotFound();
    }
  }

  return result.success;
};
