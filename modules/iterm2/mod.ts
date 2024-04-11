import { join, resolve } from "path";
import { modular } from "../../utils/modular.ts";
import { __dirname } from "./../../utils/path.ts";
import { log } from "../../utils/logger.ts";
import { execute } from "../../utils/execute.ts";
import { exists } from "./../../utils/exists.ts";

export default modular({
  name: "iterm2",

  install: () => {
    if (!exists("/Applications/iTerm.app")) {
      log.warning(
        "iTerm2 is not installed. Skipping iTerm2 preferences setup."
      );
      return;
    }

    const source = resolve(
      join(__dirname(import.meta.url), "com.googlecode.iterm2.plist")
    );

    execute(
      "defaults",
      "write",
      "com.googlecode.iterm2.plist",
      "PrefsCustomFolder",
      "-string",
      source
    );

    execute(
      "defaults",
      "write",
      "com.googlecode.iterm2.plist",
      "LoadPrefsFromCustomFolder",
      "-bool",
      "true"
    );
  },

  update: () => {},

  uninstall: () => {},
});
