import { join, resolve, relative } from "path";
import { modular } from "../../utils/modular.ts";
import { symlink } from "../../utils/symlink.ts";
import { homeDir, __dirname } from "./../../utils/path.ts";
import { log } from "../../utils/logger.ts";

export default modular({
  name: "karabiner",

  install: () => {
    const files = [
      "karabiner.json",
      join("assets", "complex_modifications", "1626345510.json"),
    ];

    for (const file of files) {
      const source = resolve(join(__dirname(import.meta.url), file));
      const to = resolve(join(homeDir(), ".config", "karabiner", file));
      symlink(source, to);
    }
  },

  update: () => {
    const copyFiles: string[] = [];
    const config = resolve(join(homeDir(), ".config", "karabiner"));

    const walk = (
      path: string,
      callback: (entry: Deno.DirEntry, parent: string) => void
    ) => {
      for (const entry of Deno.readDirSync(path)) {
        if (entry.isDirectory) {
          walk(join(path, entry.name), callback);
        } else {
          callback(entry, join(path, entry.name));
        }
      }
    };

    walk(config, (entry, path) => {
      if (path.includes("automatic_backups")) return;
      if (entry.isDirectory || entry.isSymlink) return;
      copyFiles.push(path);
    });

    for (const source of copyFiles) {
      const to = resolve(
        join(
          __dirname(import.meta.url),
          relative(resolve(join(homeDir(), ".config", "karabiner")), source)
        )
      );
      Deno.copyFileSync(source, to);
      log.debug(`Copied ${source} -> ${to}`);
    }
  },

  uninstall: async () => {},
});
