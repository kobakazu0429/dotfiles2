import { join, resolve } from "path";
import { modular } from "../../utils/modular.ts";
import { symlink } from "../../utils/symlink.ts";
import { __dirname, homeDir } from "./../../utils/path.ts";

export default modular({
  name: "smb",

  install: () => {
    const files = ["nsmb.conf"];

    for (const file of files) {
      const source = resolve(join(__dirname(import.meta.url), file));
      const to = resolve(join(homeDir(), "Library", "Preferences", file));
      symlink(source, to);
    }
  },

  update: () => {},

  uninstall: () => {},
});
