import { join, resolve } from "path";
import { exec } from "./../utils/exec.ts";

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
      resolve(join(Deno.cwd(), "brew", "Brewfile")),
    ],
  });
  return result;
};
