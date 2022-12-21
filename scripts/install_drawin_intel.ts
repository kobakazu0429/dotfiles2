import { install } from "./../utils/run.ts";
import { log } from "../utils/logger.ts";
import { which } from "../utils/which.ts";
import { dedent } from "ts-dedent";

export const intelMac = async () => {
  if (!which("brew")) {
    log.warning(dedent`
      Install homebrew first with ↓
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    `);
    Deno.exit(1);
  }

  await install("zsh");
  await install("homebrew");
  // await install("brew");
  await install("fonts");
  await install("clang");
  await install("csscomb");
  await install("git");
  await install("karabiner");
};
