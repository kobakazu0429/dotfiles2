import { join, resolve } from "path";
import { log } from "../utils/logger.ts";
import { exec } from "./../utils/exec.ts";
import { __dirname } from "./../utils/path.ts";

export const installBrewfile = () => {
  if (
    !exec("brew", {
      args: [
        "bundle",
        "--file",
        resolve(join(__dirname(import.meta.url), "Brewfile")),
      ],
    })
  ) {
    log.error("Failed brew install");
    Deno.exit(1);
  }
};
