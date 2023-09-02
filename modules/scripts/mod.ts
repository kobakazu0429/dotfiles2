import { modular } from "../../utils/modular.ts";
import { execute } from "../../utils/execute.ts";
import { which } from "./../../utils/which.ts";

export default modular({
  name: "scripts",

  install: () => {
    which("yarn");

    const packages = ["zx"];
    execute("yarn", "global", "add", ...packages);
  },

  update: () => {},

  cleanup: () => {},
});
