import { join, resolve } from "path";
import { symlink } from "../../utils/symlink.ts";
import { homeDir, __dirname } from "./../../utils/path.ts";

export default () => {
  const files = [".csscomb.json"];

  for (const file of files) {
    const source = resolve(join(__dirname(import.meta.url), file));
    const to = resolve(join(homeDir(), file));
    symlink(source, to);
  }
};
