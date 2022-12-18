import { join, resolve } from "path";
import { exec } from "./../utils/exec.ts";
import { __dirname } from "./../utils/path.ts";

// https://github.com/Homebrew/homebrew-bundle
// https://gist.github.com/yoshimana/43b9205ddedad0ad65f2dee00c6f4261

export const updateBrewfile = () => {
  const result = exec("brew", {
    args: [
      "bundle",
      "dump",
      "--force",
      "--describe",
      "--file",
      resolve(join(__dirname(import.meta.url), "Brewfile")),
    ],
  });
  return result;
};
