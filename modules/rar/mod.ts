import { moveSync } from "fs";
import { basename, dirname, join, resolve } from "path";
import { modular } from "../../utils/modular.ts";
import { execute } from "./../../utils/execute.ts";
import { OS, detectOS } from "./../../utils/os.ts";
import { __dirname, homeBinDir, tempDir } from "./../../utils/path.ts";

const ver = "700";
const urls: Record<OS, string> = {
  intel_mac: `https://www.rarlab.com/rar/rarmacos-x64-${ver}.tar.gz`,
  arm_mac: `https://www.rarlab.com/rar/rarmacos-arm-${ver}.tar.gz`,
  ubuntu: `https://www.rarlab.com/rar/rarlinux-x64-${ver}.tar.gz`,
};
const files = ["rar", "unrar"];

export default modular({
  name: "rar",

  install: () => {
    const url = urls[detectOS()];

    const filename = basename(url);
    const downloadDirectory = tempDir();
    const downloadPath = resolve(join(downloadDirectory, filename));

    execute("wget", url, "-O", downloadPath);
    execute("tar", "-zxvf", downloadPath, "-C", dirname(downloadPath));

    for (const file of files) {
      const from = resolve(join(downloadDirectory, "rar", file));
      const to = resolve(join(homeBinDir(), file));
      moveSync(from, to, { overwrite: true });
    }
  },

  update: () => {},

  uninstall: () => {
    for (const file of files) {
      Deno.removeSync(resolve(join(homeBinDir(), file)));
    }
  },
});
