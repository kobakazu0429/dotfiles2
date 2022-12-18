import { exec } from "./exec.ts";

export const symlink = (source: string, to: string) => {
  return exec("ln", { args: ["-sf", source, to] });
};
