import { join, resolve } from "path";
import { modular } from "../../utils/modular.ts";
import { symlink } from "../../utils/symlink.ts";
import { detectOS, type OS } from "./../../utils/os.ts";
import { homeDir, __dirname } from "./../../utils/path.ts";

const diffHighlight: Record<OS, string> = {
  intel_mac: "/usr/local/share/git-core/contrib/diff-highlight/diff-highlight",
  arm_mac: "/opt/homebrew/share/git-core/contrib/diff-highlight/diff-highlight",
  ubuntu: "/usr/share/doc/git/contrib/diff-highlight/diff-highlight",
};

export default modular({
  name: "git",

  install: () => {
    const files = ["config", "ignore"];

    for (const file of files) {
      const source = resolve(join(__dirname(import.meta.url), file));
      const to = resolve(join(homeDir(), ".config", "git", file));
      symlink(source, to);
    }

    symlink(
      diffHighlight[detectOS()],
      resolve(join(homeDir(), ".local", "bin", "diff-highlight"))
    );
  },

  update: async () => {},

  uninstall: async () => {},
});
