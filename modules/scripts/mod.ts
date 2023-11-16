import { join, resolve } from "path";
import { modular } from "../../utils/modular.ts";
import { execute } from "../../utils/execute.ts";
import { symlink } from "./../../utils/symlink.ts";
import { which } from "./../../utils/which.ts";
import { __dirname, homeBinDir } from "../../utils/path.ts";

const cmds: [source: string, alias: string][] = [
  ["base64.js", "b6"],
  ["lsrar.js", "lsrar"],
];

export default modular({
  name: "scripts",

  install: () => {
    which("yarn");

    const packages = ["zx"];
    execute("yarn", "global", "add", ...packages);

    for (const [sourceFile, alias] of cmds) {
      const source = resolve(join(__dirname(import.meta.url), sourceFile));
      const to = resolve(join(homeBinDir(), alias));
      symlink(source, to);
      execute("chmod", "+x", to);
    }
  },

  update: () => {},

  cleanup: () => {
    for (const [, alias] of cmds) {
      const to = resolve(join(homeBinDir(), alias));
      Deno.removeSync(to);
    }
  },
});
