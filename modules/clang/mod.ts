import { join, resolve } from "path";
import { symlink } from "../../utils/symlink.ts";
import { homeDir, __dirname } from "./../../utils/path.ts";
import { modular } from "../../utils/modular.ts";

export default modular({
  name: "clang",

  install: () => {
    const files = [".clang-format"];

    for (const file of files) {
      const source = resolve(join(__dirname(import.meta.url), file));
      const to = resolve(join(homeDir(), file));
      symlink(source, to);
    }
  },

  update: () => {},

  cleanup: () => {},
});
