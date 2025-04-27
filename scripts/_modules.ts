import { type Module } from "./../utils/modular.ts";
import { getEnv } from "./../utils/env.ts";
import { topologicalSort } from "../utils/topologicalSort.ts";
const env = getEnv();

const modules = [
  (await import("../modules/homebrew/mod.ts")).default,
  (await import("../modules/brew/mod.ts")).default,
  (await import("../modules/ssh/mod.ts")).default,
  (await import("../modules/zsh/mod.ts")).default,
  (await import("../modules/git/mod.ts")).default,
  (await import("../modules/iterm2/mod.ts")).default,
  (await import("../modules/htop/mod.ts")).default,
  (await import("../modules/ghq/mod.ts")).default,
  (await import("../modules/fonts/mod.ts")).default,
  (await import("../modules/clang/mod.ts")).default,
  (await import("../modules/csscomb/mod.ts")).default,
  (await import("../modules/karabiner/mod.ts")).default,
  (await import("../modules/mise/mod.ts")).default,
  (await import("../modules/scripts/mod.ts")).default,
  (await import("../modules/bettertouchtool/mod.ts")).default,
  (await import("../modules/docker/mod.ts")).default,
  env === "personal" && (await import("../modules/smb/mod.ts")).default,
].filter((m) => m !== false) as Module[];

export const sortedModules = topologicalSort(modules);
