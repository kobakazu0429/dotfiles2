import { join, resolve } from "path";
import { modular } from "../../utils/modular.ts";
import { __dirname, FPATH } from "./../../utils/path.ts";
import { which } from "../../utils/which.ts";
import { execute } from "../../utils/execute.ts";

export default modular({
  name: "docker",

  needs: [(await import("../homebrew/mod.ts")).default.name],

  install: () => {
    if (!which("docker")) return;
    const { stdoutString } = execute("docker", "completion", "zsh", {
      silent: false,
      streaming: false,
    });
    if (!stdoutString) throw new Error("`$ docker completion zsh` is failed");
    if (!FPATH) throw new Error("FPATH is not undefined");
    const dist = resolve(join(FPATH, "_docker"));

    Deno.writeTextFileSync(dist, stdoutString);
  },

  update: () => {},

  uninstall: () => {
    if (!FPATH) throw new Error("FPATH is not undefined");
    const dist = resolve(join(FPATH, "_docker"));
    Deno.removeSync(dist);
  },
});
