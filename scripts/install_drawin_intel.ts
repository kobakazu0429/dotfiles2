import { log } from "../utils/logger.ts";
import { which } from "../utils/which.ts";
import { dedent } from "ts-dedent";

export const intelMac = () => {
  checkBrew();
};

const checkBrew = () => {
  if (!which("brew2")) {
    log.warning(dedent`
      Install homebrew first with ↓
      /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    `);
  }

  Deno.exit(1);
};
