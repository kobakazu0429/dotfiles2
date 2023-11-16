import { join, resolve } from "path";
import { modular } from "../../utils/modular.ts";
import { symlink } from "../../utils/symlink.ts";
import { XDG_CONFIG_HOME, __dirname } from "./../../utils/path.ts";

export default modular({
  name: "htop",

  install: () => {
    const files = ["htoprc"];

    for (const file of files) {
      const source = resolve(join(__dirname(import.meta.url), file));
      const to = resolve(join(XDG_CONFIG_HOME, "htop", file));
      symlink(source, to);
    }
  },

  update: () => {},

  cleanup: () => {},
});
