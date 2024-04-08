import { join, resolve } from "path";
import { symlink } from "../../utils/symlink.ts";
import { __dirname, XDG_CONFIG_HOME } from "./../../utils/path.ts";
import { modular } from "../../utils/modular.ts";
import { execute } from "./../../utils/execute.ts";

export default modular({
  name: "zsh",

  install: () => {
    const files = [
      [".zshrc", resolve(join(XDG_CONFIG_HOME, "zsh"))],
      [".zshenv", resolve(join(XDG_CONFIG_HOME, "zsh"))],
      [".zimrc", resolve(join(XDG_CONFIG_HOME, "zim"))],
    ];

    for (const [filename, _to] of files) {
      const source = resolve(join(__dirname(import.meta.url), filename));
      const to = resolve(join(_to, filename));
      symlink(source, to);
    }

    if (!Deno.readTextFileSync("/etc/zshenv").includes("ZDOTDIR")) {
      execute(
        "sudo",
        "sh",
        "-c",
        'echo "ZDOTDIR=$HOME/.config/zsh" >> /etc/zshenv'
      );
    }
  },

  update: () => {},

  uninstall: () => {},
});
