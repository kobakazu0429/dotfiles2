import { exec } from "./../../utils/exec.ts";

export default {
  name: "scripts",

  install: () => {
    const packages = ["zx"];
    exec("yarn", { args: ["global", "add", ...packages] });
  },

  update: () => {},
};
