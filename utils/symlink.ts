import { dirname } from "path";
import { ensureDirSync, ensureSymlinkSync } from "fs";
import { log } from "./logger.ts";

export const symlink = (source: string, to: string) => {
  // return exec("ln", { args: ["-sf", source, to] });

  try {
    ensureDirSync(dirname(to));
    Deno.statSync(source);
    const result = ensureSymlinkSync(source, to);
    log.debug(`Symlink ${source} -> ${to}`);
    return result;
  } catch (error) {
    log.error(error);
  }
};
