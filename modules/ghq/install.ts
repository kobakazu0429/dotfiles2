import { resolve, join, dirname } from "path";
import { tempDir, homeDir } from "./../../utils/path.ts";
import { exec } from "./../../utils/exec.ts";
import { which } from "./../../utils/which.ts";
import { log } from "../../utils/logger.ts";

export default () => {
  if (!which("ghq")) {
    log.info("Installed ghq");
    return;
  }

  const { os, arch } = Deno.build;

  if (os === "darwin" && arch === "x86_64") {
    exec("brew", { args: ["install", "ghq"] });
  } else {
    which(["brew", "wget", "unzip", "mkdir", "mv"], true);

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
};
