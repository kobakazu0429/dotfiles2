import { join, resolve } from "path";
import { __dirname } from "./../../utils/path.ts";
import { modular } from "../../utils/modular.ts";
import { execute } from "./../../utils/execute.ts";

// https://github.com/Homebrew/homebrew-bundle
// https://gist.github.com/yoshimana/43b9205ddedad0ad65f2dee00c6f4261

export default modular({
  name: "brew",

  install: () => {
    execute("brew", "upgrade");
    execute(
      "brew",
      "bundle",
      "--file",
      resolve(join(__dirname(import.meta.url), "Brewfile"))
    );
  },

  update: () => {
    execute(
      "brew",
      "bundle",
      "dump",
      "--force",
      "--describe",
      "--file",
      resolve(join(__dirname(import.meta.url), "Brewfile"))
    );
  },

  cleanup: () => {},
});
