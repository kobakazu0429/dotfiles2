import { resolve, join, dirname } from "path";
import { tempDir, homeDir } from "./../../utils/path.ts";
import { exec } from "./../../utils/exec.ts";

export default () => {
  const { os, arch } = Deno.build;

  if (os === "darwin" && arch === "x86_64") {
    exec("brew", { args: ["install", "ghq"] });
  } else {
    const filename = "ghq_linux_amd64.zip";
    const downloadFilepath = resolve(join(tempDir(), filename));
    const unzipDirectoryPath = dirname(filename);
    const storeDirectoryPath = resolve(join(homeDir(), ".local", "bin"));
    exec("wget", {
      args: [
        `https://github.com/x-motemen/ghq/releases/latest/download/${filename}`,
        "-o",
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
