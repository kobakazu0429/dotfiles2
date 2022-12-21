import { exec } from "./exec.ts";
import { exitCommandNotFound } from "./exit.ts";

type WhichCache = Record<string, boolean>;
const KEY = "which";

const _witch = (command: string) => {
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

  return result.status;
};

export const which = (
  command: string | string[],
  exit = false
): boolean | void => {
  if (Array.isArray(command)) {
    for (const c of command) {
      const result = _witch(c);
      if (!result) {
        if (exit) {
          exitCommandNotFound();
        } else {
          return false;
        }
      }
    }
  } else {
    const result = _witch(command);
    return result;
  }
};
