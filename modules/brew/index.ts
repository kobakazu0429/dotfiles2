import { join, resolve } from "path";
import { __dirname } from "./../../utils/path.ts";
import { log } from "../../utils/logger.ts";
import { exec } from "./../../utils/exec.ts";

// https://github.com/Homebrew/homebrew-bundle
// https://gist.github.com/yoshimana/43b9205ddedad0ad65f2dee00c6f4261

export default {
  name: "template",

  install: () => {
    if (
      !exec("brew", {
        args: [
          "bundle",
          "--file",
          resolve(join(__dirname(import.meta.url), "Brewfile")),
        ],
      })
    ) {
      log.error("Failed brew install");
      Deno.exit(1);
    }
  },

  update: () => {
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
  },
};
