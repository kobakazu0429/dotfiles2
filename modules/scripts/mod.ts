import { modular } from "../../utils/modular.ts";
import { exec } from "../../utils/exec.ts";

export default modular({
  name: "scripts",

  install: async () => {
    const packages = ["zx"];
    await exec("yarn", { args: ["global", "add", ...packages] });
  },

  update: async () => {},

  cleanup: async () => {},
});
