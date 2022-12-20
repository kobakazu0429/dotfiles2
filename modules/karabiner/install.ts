import { join, resolve } from "path";
import { symlink } from "../../utils/symlink.ts";
import { log } from "../../utils/logger.ts";
import { homeDir, __dirname } from "./../../utils/path.ts";

export default () => {
  const files = [
    "karabiner.json",
    join("assets", "complex_modifications", "1626345510.json"),
  ];

  for (const file of files) {
    const source = resolve(join(__dirname(import.meta.url), file));
    const to = resolve(join(homeDir(), ".config", "karabiner", file));
    try {
      Deno.statSync(source);
      symlink(source, to);
    } catch (error) {
      log.error(error);
    }
  }
};
