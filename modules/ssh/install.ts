import { join, resolve, dirname } from "path";
import { ensureFileSync, ensureDirSync } from "fs";
import { exec } from "../../utils/exec.ts";
import { log } from "../../utils/logger.ts";
import { homeDir } from "./../../utils/path.ts";

export default () => {
  const keyNmae = "id_ed25519_github";
  const dest = resolve(join(homeDir(), ".ssh", keyNmae));
  const config = resolve(join(homeDir(), ".ssh", "config"));

  try {
    Deno.statSync(dest);
    log.info("Generated GitHub SSH key");
  } catch {
    ensureDirSync(dirname(config));
    ensureFileSync(config);
    Deno.writeTextFileSync(
      config,
      `Host github
  HostName github.com
  IdentityFile ${dest}
  User git
`
    );

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
