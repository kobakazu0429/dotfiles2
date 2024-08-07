import { modular } from "../../utils/modular.ts";
import { which } from "./../../utils/which.ts";
import { execute } from "./../../utils/execute.ts";

export default modular({
  name: "volta",

  needs: [(await import("../brew/mod.ts")).default.name],

  install: () => {
    which("volta");
    execute("volta", "install", "node"); // LTS
    execute("volta", "install", "pnpm");
  },

  update: () => {},

  uninstall: () => {},
});
