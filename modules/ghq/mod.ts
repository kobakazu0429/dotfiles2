import { join, resolve, dirname } from "path";
import { modular } from "../../utils/modular.ts";
import { tempDir, homeDir, __dirname } from "./../../utils/path.ts";
import { exec } from "./../../utils/exec.ts";
import { which } from "./../../utils/which.ts";

const { os, arch } = Deno.build;

export default modular({
  name: "ghq",

  install: async () => {
    if (!(await which("ghq"))) {
      return;
    }

    if (os === "darwin" && arch === "x86_64") {
      // installed by brewfile
      // exec("brew", { args: ["install", "ghq"] });
    } else {
      for await (const c of ["brew", "wget", "unzip", "mkdir", "mv"]) {
        await which(c, { exitIfNotFound: true });
      }

      const filename = "ghq_linux_amd64.zip";
      const downloadFilepath = resolve(join(tempDir(), filename));
      const unzipDirectoryPath = dirname(filename);
      const storeDirectoryPath = resolve(join(homeDir(), ".local", "bin"));
      exec("wget", {
        args: [
          `https://github.com/x-motemen/ghq/releases/latest/download/${filename}`,
          "-O",
          downloadFilepath,
        ],
      });
      exec("unzip", { args: [downloadFilepath] });
      exec("mkdir", { args: ["-p", storeDirectoryPath] });
      exec("mv", {
        args: [resolve(join(unzipDirectoryPath, "ghq")), storeDirectoryPath],
      });
    }
  },

  update: async () => {},

  cleanup: async () => {},
});
