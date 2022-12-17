import { log } from "./logger.ts";

export const homeDir = () => {
  const path = Deno.env.get("HOME") ?? Deno.env.get("USERPROFILE");
  if (path) return path;
  log.error("Can't get home path");
  Deno.exit(1);
};

export const tempDir = () => {
  const path = Deno.env.get("TEMP") ?? Deno.env.get("TEMPDIR");
  if (path) return path;
  log.error("Can't get home path");
  Deno.exit(1);
};
