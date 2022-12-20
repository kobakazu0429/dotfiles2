import { resolve, join, dirname, fromFileUrl } from "path";
import { log } from "./logger.ts";

export const homeDir = () => {
  const path = Deno.env.get("HOME") ?? Deno.env.get("USERPROFILE");
  if (path) return path;
  log.error("Can't get home path");
  Deno.exit(1);
};

export const tempDir = () => {
  const path =
    Deno.env.get("TMPDIR") ??
    Deno.env.get("TMP") ??
    Deno.env.get("TEMP") ??
    Deno.env.get("TEMPDIR");
  if (path) return path;
  log.error("Can't get temp path");
  Deno.exit(1);
};

export const __dirname = (url: ImportMeta["url"]) => dirname(fromFileUrl(url));

export const XDG_CONFIG_HOME =
  Deno.env.get("XDG_CONFIG_HOME") ?? resolve(join(homeDir(), ".config"));
export const XDG_CACHE_HOME =
  Deno.env.get("XDG_CACHE_HOME") ?? resolve(join(homeDir(), ".cache"));
export const XDG_DATA_HOME =
  Deno.env.get("XDG_DATA_HOME") ?? resolve(join(homeDir(), ".local", "share"));
