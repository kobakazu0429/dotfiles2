import { join, resolve } from "path";
import { symlink } from "../../utils/symlink.ts";
import { os, type OS } from "./../../utils/os.ts";
import { homeDir, __dirname } from "./../../utils/path.ts";

export default () => {
  const files = ["config", "ignore"];

  for (const file of files) {
    const source = resolve(join(__dirname(import.meta.url), file));
    const to = resolve(join(homeDir(), ".config", "git", file));
    symlink(source, to);
  }

  const diffHighlight: Record<OS, string> = {
    intel_mac:
      "/usr/local/share/git-core/contrib/diff-highlight/diff-highlight",
    m1_mac:
      "/opt/homebrew/share/git-core/contrib/diff-highlight/diff-highlight ",
    ubuntu: "/usr/share/doc/git/contrib/diff-highlight/diff-highlight",
  };
  symlink(diffHighlight[os()], "/usr/local/bin/diff-highlight");
};
