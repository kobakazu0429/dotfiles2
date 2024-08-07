import { join, resolve } from "path";
import { __dirname } from "./../../utils/path.ts";
import { modular } from "../../utils/modular.ts";
import { execute } from "./../../utils/execute.ts";
import { getEnv, type Env } from "../../utils/env.ts";
import { minimum, personal } from "./brewfile.ts";

// https://github.com/Homebrew/homebrew-bundle
// https://gist.github.com/yoshimana/43b9205ddedad0ad65f2dee00c6f4261

const brewfilePath = resolve(join(__dirname(import.meta.url), "Brewfile"));

const writeBrewfile = (body: string) => {
  Deno.writeTextFileSync(brewfilePath, body);
};

const getData = (env: Env) => {
  if (env === "minimum") return minimum;
  else if (env === "personal") return personal;

  return minimum;
};

export default modular({
  name: "brew",

  needs: [(await import("../homebrew/mod.ts")).default.name],

  install: () => {
    const data = getData(getEnv());
    writeBrewfile(data.join("\n"));

    execute("brew", "update");
    execute("brew", "upgrade");
    execute("brew", "bundle", "--file", brewfilePath);
    execute("brew", "cleanup");
  },

  update: () => {
    execute(
      "brew",
      "bundle",
      "dump",
      "--force",
      "--describe",
      "--file",
      brewfilePath
    );
    const brewfile = Deno.readTextFileSync(brewfilePath);
    Deno.writeTextFileSync(
      brewfilePath,
      brewfile
        .split("\n")
        .filter((line) => !line.startsWith("vscode "))
        .join("\n")
    );
  },

  uninstall: () => {},
});
