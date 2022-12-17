import { exec } from "./exec.ts";

export const symbolicLink = (source: string, to: string) => {
  return exec("ln", { args: ["-sf", source, to] });
};
