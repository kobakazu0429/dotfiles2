import { modular } from "../../utils/modular.ts";
import { execute } from "../../utils/execute.ts";

export default modular({
  name: "scripts",

  install: () => {
    const packages = ["zx"];
    execute("yarn", "global", "add", ...packages);
  },

  update: () => {},

  cleanup: () => {},
});
