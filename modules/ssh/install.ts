import { join, resolve } from "path";
import { exec } from "../../utils/exec.ts";
import { log } from "../../utils/logger.ts";
import { homeDir } from "./../../utils/path.ts";

export default () => {
  const keyNmae = "id_ed25519_github";
  const dest = resolve(join(homeDir(), ".ssh", keyNmae));

  try {
    Deno.statSync(dest);
    log.info("Generated GitHub SSH key");
  } catch {
    exec("ssh-keygen", {
      args: ["-t", "ed25519", "-f", dest, "-N", ""],
    });

    log.info("Add your new key");
    log.info("https://github.com/settings/ssh/new");
    log.info(Deno.readTextFileSync(dest + ".pub"));

    Deno.exit(0);
  }

  log.info("Installed ssh");
};
