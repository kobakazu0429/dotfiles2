import { modular } from "../../utils/modular.ts";
import { execute } from "./../../utils/execute.ts";
import { which } from "./../../utils/which.ts";

export default modular({
  name: "homebrew",

  install: () => {
    if (which("brew")) return;

    execute(
      "/bin/bash",
      "-c",
      `"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
    );
  },

  update: () => {},

  uninstall: () => {},
});
