import { log } from "../utils/logger.ts";
import { exec } from "./../utils/exec.ts";
import { install } from "./../utils/run.ts";
import { which } from "./../utils/which.ts";
import { intelMac } from "./install_drawin_intel.ts";
import { testSSHConnection } from "../modules/git/utils.ts";

const { os, arch } = Deno.build;

if (!which("git")) {
  log.error("not found `git`");
}

if (!testSSHConnection()) {
  log.error("failed ssh github");
  Deno.exit(1);
}

if (!which("ghq")) {
  await install("ghq");
}

// // https://github.com/kobakazu0429/dotfiles2.git
if (
  !exec("ghq", { args: ["get", "git@github.com:kobakazu0429/dotfiles2.git"] })
) {
  log.error("failed clone dotfiles repository");
  Deno.exit(1);
}

if (os === "darwin" && arch === "x86_64") {
  intelMac();
} else {
  log.info("not support os and arch");
}
