import { join, resolve } from "path";
import { modular } from "../../utils/modular.ts";
import { symlink } from "../../utils/symlink.ts";
import { homeDir, __dirname } from "./../../utils/path.ts";

export default modular({
  name: "template",

  install: () => {
    const files = [""];

    for (const file of files) {
      const source = resolve(join(__dirname(import.meta.url), file));
      const to = resolve(join(homeDir(), file));
      symlink(source, to);
    }
  },

  update: () => {},

  cleanup: () => {},
});
