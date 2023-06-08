import { join, resolve, dirname } from "path";
import { ensureFileSync, ensureDirSync } from "fs";
import { dedent } from "ts-dedent";
import { exec } from "../../utils/exec.ts";
import { log } from "../../utils/logger.ts";
import { homeDir } from "./../../utils/path.ts";
import { modular } from "./../../utils/modular.ts";
import { exitGeneralErrors } from "../../utils/exit.ts";

const keyNmae = "id_ed25519_github";
const destPath = resolve(join(homeDir(), ".ssh", keyNmae));
const configPath = resolve(join(homeDir(), ".ssh", "config"));

const config = dedent`
Host github
  HostName github.com
  IdentityFile ${destPath}
  User git
`;

const checkSSHConnection = async () => {
  const { stderrString } = await exec(
    "ssh",
    { args: ["-T", "git@github.com"] },
    { streaming: false }
  );

  const result = stderrString?.startsWith(
    "Hi kobakazu0429! You've successfully authenticated"
  );

  if (result) {
    log.info("Successfully, Connected to GitHub with SSH.");
  } else {
    log.warning("Failed, Connected to GitHub with SSH.");
  }

  return !!result;
};

export default modular({
  name: "ssh",

  install: async () => {
    try {
      Deno.statSync(destPath);
      log.info("Already generated GitHub SSH key.");
    } catch {
      ensureDirSync(dirname(config));
      ensureFileSync(config);
      Deno.writeTextFileSync(configPath, config);

      await exec("ssh-keygen", {
        args: ["-t", "ed25519", "-f", destPath, "-N", ""],
      });

      log.info("Need your action: add your new key");
      log.info("https://github.com/settings/ssh/new");
      log.info(Deno.readTextFileSync(destPath + ".pub"));
      exitGeneralErrors();
    }

    if (!(await checkSSHConnection())) {
      exitGeneralErrors();
    }
  },

  update: () => {},

  cleanup: () => {},
});
