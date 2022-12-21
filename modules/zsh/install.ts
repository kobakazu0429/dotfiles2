import { join, resolve } from "path";
import { symlink } from "../../utils/symlink.ts";
import { __dirname, XDG_CONFIG_HOME } from "./../../utils/path.ts";

export default () => {
  const files = [
    [".zshrc", resolve(join(XDG_CONFIG_HOME, "zsh"))],
    [".zshenv", resolve(join(XDG_CONFIG_HOME, "zsh"))],
    [".zimrc", resolve(join(XDG_CONFIG_HOME, "zim"))],
  ];

  for (const [_source, _to] of files) {
    const source = resolve(join(__dirname(import.meta.url), _source));
    const to = resolve(join(_to, _source));
    symlink(source, to);
  }
};
