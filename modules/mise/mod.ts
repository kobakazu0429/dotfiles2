import { join, resolve } from "path";
import { modular } from "../../utils/modular.ts";
import { symlink } from "../../utils/symlink.ts";
import { __dirname } from "./../../utils/path.ts";
import { which } from "../../utils/which.ts";
import { XDG_CONFIG_HOME } from "../../utils/path.ts";
import { execute } from "../../utils/execute.ts";

export default modular({
  name: "mise",

  needs: [(await import("../brew/mod.ts")).default.name],

  install: () => {
    which("mise");

    const files = ["config.toml"];

    for (const file of files) {
      const source = resolve(join(__dirname(import.meta.url), file));
      const to = resolve(join(XDG_CONFIG_HOME, "mise", file));
      symlink(source, to);
    }

    execute("mise", "install");
  },

  update: () => {},

  uninstall: () => {},
});
