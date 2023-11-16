// import { join, resolve } from "path";
import { log } from "../../utils/logger.ts";
import { modular } from "../../utils/modular.ts";
// import { symlink } from "../../utils/symlink.ts";
import { __dirname } from "./../../utils/path.ts";

export default modular({
  name: "smb",

  install: () => {
    // const files = ["nsmb.conf"];
    // for (const file of files) {
    //   const source = resolve(join(__dirname(import.meta.url), file));
    //   const to = resolve(join("/etc", file));
    //   symlink(source, to);
    // }
    log.info("TODO: permission problem.");
    log.info(
      "$ sudo ln -s $GHQ_ROOT/github.com/kobakazu0429/dotfiles2/modules/smb/nsmb.conf /etc/nsmb.conf"
    );
  },

  update: () => {},

  uninstall: () => {},
});
