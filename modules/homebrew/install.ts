import { log } from "../../utils/logger.ts";
import { which } from "./../../utils/which.ts";
import { exec } from "./../../utils/exec.ts";
import { __dirname } from "./../../utils/path.ts";

export default () => {
  if (which("brew")) {
    log.info("installed brew");
    return;
  }
  // log.warning(dedent`
  //   Install homebrew first with ↓
  //   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  // `);
  // Deno.exit(1);
  exec("/bin/bash", {
    args: [
      "-c",
      `"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`,
    ],
  });
};
