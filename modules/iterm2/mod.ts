import { join, resolve } from "path";
import { modular } from "../../utils/modular.ts";
import { __dirname } from "./../../utils/path.ts";
import { log } from "../../utils/logger.ts";
import { execute } from "../../utils/execute.ts";
import { exists } from "./../../utils/exists.ts";

export default modular({
  name: "iterm2",

  needs: [(await import("../brew/mod.ts")).default.name],

  install: () => {
    if (!exists("/Applications/iTerm.app")) {
      throw new Error(
        "iTerm2 is not installed. Skipping iTerm2 preferences setup."
      );
    }

    const pwd = import.meta.dirname;
    if (!pwd) {
      throw new Error(
        "Could not get current directory. Skipping iTerm2 preferences setup."
      );
    }

    execute(
      "defaults",
      "write",
      "com.googlecode.iterm2.plist",
      "PrefsCustomFolder",
      "-string",
      pwd
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
