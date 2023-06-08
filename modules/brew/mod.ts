import { join, resolve } from "path";
import { __dirname } from "./../../utils/path.ts";
import { modular } from "../../utils/modular.ts";
import { exec } from "./../../utils/exec.ts";

// https://github.com/Homebrew/homebrew-bundle
// https://gist.github.com/yoshimana/43b9205ddedad0ad65f2dee00c6f4261

export default modular({
  name: "brew",

  install: async () => {
    await exec("brew", { args: ["upgrade"] });

    await exec("brew", {
      args: [
        "bundle",
        "--file",
        resolve(join(__dirname(import.meta.url), "Brewfile")),
      ],
    });
  },

  update: async () => {
    await exec("brew", {
      args: [
        "bundle",
        "dump",
        "--force",
        "--describe",
        "--file",
        resolve(join(__dirname(import.meta.url), "Brewfile")),
      ],
    });
  },

  cleanup: () => {},
});
