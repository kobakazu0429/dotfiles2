import { join, resolve } from "path";
import { log } from "../utils/logger.ts";
import { exec } from "./../utils/exec.ts";
import { homeDir } from "./../utils/path.ts";
import { symbolicLink } from "./../utils/symbolicLink.ts";

export const installBrewfile = () => {
  if (
    !symbolicLink(
      resolve(join(Deno.cwd(), "brew", "Brewfile")),
      resolve(join(homeDir(), ".Brewfile"))
    )
  ) {
    log.error("Failed create symbolic link");
    Deno.exit(1);
  }

  if (!exec("brew", { args: ["bundle"] })) {
    log.error("Failed brew install");
    Deno.exit(1);
  }
};
