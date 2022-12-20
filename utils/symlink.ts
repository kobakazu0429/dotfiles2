import { ensureSymlinkSync } from "fs";
import { log } from "./logger.ts";

export const symlink = (source: string, to: string) => {
  // return exec("ln", { args: ["-sf", source, to] });

  const result = ensureSymlinkSync(source, to);
  log.debug(`Symlink ${source} -> ${to}`);
  return result;
};
