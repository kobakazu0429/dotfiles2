import { log } from "../utils/logger.ts";
import { exec } from "./../utils/exec.ts";
import { install } from "./../utils/run.ts";
import { which } from "./../utils/which.ts";
import installSSH from "../modules/ssh/install.ts";
import { exitGeneralErrors } from "./../utils/exit.ts";
import { isExist } from "./../modules/ghq/utils.ts";
import { testSSHConnection } from "../modules/git/utils.ts";
import { intelMac } from "./install_drawin_intel.ts";

const { os, arch } = Deno.build;

which("git", true);

installSSH();

if (!testSSHConnection()) {
  log.error("failed ssh github");
  exitGeneralErrors();
}

if (!which("ghq")) {
  await install("ghq");
}

// // https://github.com/kobakazu0429/dotfiles2.git
if (isExist("kobakazu0429", "dotfiles2")) {
  log.info("already cloned");
} else {
  if (
    !exec("ghq", { args: ["get", "git@github.com:kobakazu0429/dotfiles2.git"] })
  ) {
    log.error("failed clone dotfiles repository");
    Deno.exit(1);
  }
}

if (os === "darwin" && arch === "x86_64") {
  intelMac();
} else {
  log.info("not support os and arch");
}
