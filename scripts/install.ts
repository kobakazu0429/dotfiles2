import { dedent } from "ts-dedent";

import { log } from "../utils/logger.ts";
import { which } from "./../utils/which.ts";

import brew from "../modules/brew/mod.ts";
import zsh from "../modules/zsh/mod.ts";
import ssh from "../modules/ssh/mod.ts";
import fonts from "../modules/fonts/mod.ts";
import git from "../modules/git/mod.ts";
import ghq from "../modules/ghq/mod.ts";
import karabiner from "../modules/karabiner/mod.ts";
import clang from "../modules/clang/mod.ts";
import csscomb from "../modules/csscomb/mod.ts";
import scripts from "../modules/scripts/mod.ts";

const { os, arch } = Deno.build;

if (os === "darwin" && arch === "x86_64") {
  if (!(await which("brew"))) {
    log.warning(dedent`
        Install homebrew first with ↓
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
      `);
    Deno.exit(1);
  }
} else {
  log.info("Not support os and arch");
  log.info(`os: ${os}, arch: ${arch}`);
  Deno.exit(1);
}

await which("git", { exitIfNotFound: true });

await brew.install();
await ssh.install();
zsh.install();
await ghq.install();
await fonts.install();
clang.install();
csscomb.install();
git.install();
karabiner.install();
scripts.install();
