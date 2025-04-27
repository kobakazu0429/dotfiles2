import { join, resolve } from "path";
import { modular } from "../../utils/modular.ts";
import { desktopDir, __dirname } from "./../../utils/path.ts";
import { execute } from "../../utils/execute.ts";
import { log } from "../../utils/logger.ts";

export default modular({
  name: "BetterTouchTool",

  needs: [(await import("../mise/mod.ts")).default.name],

  install: () => {
    if (
      (() => {
        try {
          execute("defaults", "read", "com.hegenberg.BetterTouchTool", {
            silent: true,
          });
          return true;
        } catch (_error) {
          // When failed, BetterTouchTool has never been run.
          return false;
        }
      })()
    )
      return;

    const files = ["./Default.bttpreset"];

    for (const file of files) {
      const source = resolve(join(__dirname(import.meta.url), file));
      const to = resolve(join(desktopDir(), file));
      Deno.copyFileSync(source, to);
    }

    execute(
      "op",
      "read",
      "op://Personal/BetterTouchTool/license.bettertouchtool",
      "-o",
      resolve(join(desktopDir(), "license.bettertouchtool"))
    );
  },

  update: () => {
    log.info(
      "Export from BetterTouchTool.app and Copy to modules/bettertouchtool."
    );
  },

  uninstall: () => {},
});
