import { log } from "./logger.ts";

export const exitGeneralErrors = () => {
  Deno.exit(1);
};

export const exitCommandNotFound = () => {
  log.info("Possible problem with $PATH or a typo");
  Deno.exit(127);
};
