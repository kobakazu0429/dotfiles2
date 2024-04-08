import { detectOS } from "./../utils/os.ts";
import { getEnv } from "./../utils/env.ts";

const os = detectOS();
if (os === "ubuntu") {
  throw new Error("ubuntu is not supported perfectly :C");
}

// await which("git", { exitIfNotFound: true });
const env = getEnv();

(await import("../modules/homebrew/mod.ts")).default.install();
(await import("../modules/brew/mod.ts")).default.install();
(await import("../modules/ssh/mod.ts")).default.install();
(await import("../modules/zsh/mod.ts")).default.install();
(await import("../modules/git/mod.ts")).default.install();
(await import("../modules/htop/mod.ts")).default.install();
(await import("../modules/ghq/mod.ts")).default.install();
(await import("../modules/fonts/mod.ts")).default.install();
(await import("../modules/clang/mod.ts")).default.install();
(await import("../modules/csscomb/mod.ts")).default.install();
(await import("../modules/karabiner/mod.ts")).default.install();
(await import("../modules/nodebrew/mod.ts")).default.install();
(await import("../modules/scripts/mod.ts")).default.install();
env === "personal" && (await import("../modules/smb/mod.ts")).default.install();
(await import("../modules/rar/mod.ts")).default.install();
