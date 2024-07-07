import { modular } from "../../utils/modular.ts";
import { which } from "./../../utils/which.ts";
import { execute } from "./../../utils/execute.ts";

export default modular({
  name: "nodebrew",

  needs: [(await import("../brew/mod.ts")).default.name],

  install: () => {
    which("nodebrew");
    execute("nodebrew", "setup");
    execute("nodebrew", "install", "stable");
    execute("nodebrew", "use", "stable");
  },

  update: () => {},

  uninstall: () => {},
});
