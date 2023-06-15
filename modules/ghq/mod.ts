import { join, resolve, dirname } from "path";
import { modular } from "../../utils/modular.ts";
import { tempDir, homeDir, __dirname } from "./../../utils/path.ts";
import { execute } from "./../../utils/execute.ts";
import { which } from "./../../utils/which.ts";
import { detectOS } from "./../../utils/os.ts";

export default modular({
  name: "ghq",

  install: () => {
    if (which("ghq")) return;

    const os = detectOS();
    if (os !== "ubuntu") {
      // installed by brewfile
      execute("brew", "install", "ghq");
    } else {
      for (const c of ["brew", "wget", "unzip", "mkdir", "mv"]) {
        which(c, { exitIfNotFound: true });
      }

      const filename = "ghq_linux_amd64.zip";
      const downloadFilepath = resolve(join(tempDir(), filename));
      const unzipDirectoryPath = dirname(filename);
      const storeDirectoryPath = resolve(join(homeDir(), ".local", "bin"));
      execute(
        "wget",
        `https://github.com/x-motemen/ghq/releases/latest/download/${filename}`,
        "-O",
        downloadFilepath
      );
      execute("unzip", downloadFilepath);
      execute("mkdir", "-p", storeDirectoryPath);
      execute(
        "mv",
        resolve(join(unzipDirectoryPath, "ghq")),
        storeDirectoryPath
      );
    }
  },

  update: () => {},

  cleanup: () => {},
});
