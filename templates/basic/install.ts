import { join, resolve } from "path";
import { log } from "../../utils/logger.ts";
import { homeDir, __dirname } from "./../../utils/path.ts";

export default () => {
  const files = [""];

  for (const file of files) {
    const source = resolve(join(__dirname(import.meta.url), file));
    const to = resolve(join(homeDir(), file));
    try {
      Deno.statSync(source);
      Deno.symlinkSync(source, to);
    } catch (error) {
      log.error(error);
    }
  }
};
