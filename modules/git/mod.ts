import { join, resolve } from "path";
import { modular } from "../../utils/modular.ts";
import { symlink } from "../../utils/symlink.ts";
import { detectOS, type OS } from "./../../utils/os.ts";
import { homeDir, __dirname, XDG_CONFIG_HOME } from "./../../utils/path.ts";

const diffHighlight: Record<OS, string> = {
  intel_mac: "/usr/local/share/git-core/contrib/diff-highlight/diff-highlight",
  arm_mac: "/opt/homebrew/share/git-core/contrib/diff-highlight/diff-highlight",
  ubuntu: "/usr/share/doc/git/contrib/diff-highlight/diff-highlight",
};

export default modular({
  name: "git",

  needs: [(await import("../brew/mod.ts")).default.name],

  install: () => {
    for (const file of ["config", "ignore"]) {
      const source = resolve(join(__dirname(import.meta.url), file));
      const to = resolve(join(XDG_CONFIG_HOME, "git", file));
      symlink(source, to);
    }

    for (const file of [".git_config_private", ".git_config_pxv"]) {
      const source = resolve(join(__dirname(import.meta.url), file));
      const to = resolve(join(homeDir(), file));
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
