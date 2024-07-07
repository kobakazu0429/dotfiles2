import { join, resolve } from "path";
import { modular } from "../../utils/modular.ts";
import { execute } from "../../utils/execute.ts";
import { symlink } from "./../../utils/symlink.ts";
import { which } from "./../../utils/which.ts";
import { __dirname, homeBinDir } from "../../utils/path.ts";

const cmds: [source: string, alias: string][] = [
  ["base64.js", "b6"],
  ["lsrar.js", "lsrar"],
  ["rename.mjs", "rename"],
  ["crop.mjs", "mcrop"],
];

export default modular({
  name: "scripts",

  needs: [(await import("../volta/mod.ts")).default.name],

  install: () => {
    which("pnpm");

    const packages = ["zx"];
    execute("pnpm", "add", "-g", ...packages);

    for (const [sourceFile, alias] of cmds) {
      const source = resolve(join(__dirname(import.meta.url), sourceFile));
      const to = resolve(join(homeBinDir(), alias));
      symlink(source, to);
      execute("chmod", "+x", to);
    }
  },

  update: () => {},

  uninstall: () => {
    for (const [, alias] of cmds) {
      const to = resolve(join(homeBinDir(), alias));
      Deno.removeSync(to);
    }
  },
});
