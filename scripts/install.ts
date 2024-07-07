import { type Module } from "./../utils/modular.ts";
import { topologicalSort } from "../utils/topologicalSort.ts";
import { detectOS } from "./../utils/os.ts";
import { getEnv } from "./../utils/env.ts";

const os = detectOS();
if (os === "ubuntu") {
  throw new Error("ubuntu is not supported perfectly :C");
}

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
  (await import("../modules/volta/mod.ts")).default,
  (await import("../modules/scripts/mod.ts")).default,
  (await import("../modules/bettertouchtool/mod.ts")).default,
  env === "personal" && (await import("../modules/smb/mod.ts")).default,
].filter((m) => m !== false) as Module[];

const sortedModules = topologicalSort(modules);
for await (const module of sortedModules) {
  await module.install();
}
