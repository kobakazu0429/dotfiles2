import { join, resolve, basename } from "path";
import { moveSync, copySync } from "fs";
import { modular } from "../../utils/modular.ts";
import { execute } from "./../../utils/execute.ts";
import { detectOS, type OS } from "./../../utils/os.ts";
import {
  homeDir,
  tempDir,
  __dirname,
  XDG_DATA_HOME,
} from "./../../utils/path.ts";
import { log } from "../../utils/logger.ts";
import { hashCheck } from "../../utils/hash.ts";

const userFontDirectory: Record<OS, string> = {
  intel_mac: resolve(join(homeDir(), "Library", "Fonts")),
  arm_mac: resolve(join(homeDir(), "Library", "Fonts")),
  ubuntu: resolve(join(XDG_DATA_HOME, "fonts")),
};

const HASH = {
  "Source Code Pro for Powerline":
    "f089e2eb25f4c652bd8fe41b3e24170b6dde8a43752749d6d229a6dc1ede408f",
};

const downloadDirectory = tempDir();

// REQUIRED: fix backquote bugs by fontforge
// for VSCode
// const RictyDiminished = () => {
//   // find download url from https://rictyfonts.github.io/diminished
//   const url =
//     "https://rictyfonts.github.io/files/ricty_diminished-4.0.1.tar.gz";

//   const downloadPath = resolve(join(downloadDirectory, basename(url)));
//   const fontFilename = "RictyDiminished-Regular.ttf";
//   const fontPath = resolve(join(downloadDirectory, fontFilename));
//   const destPath = resolve(join(userFontDirectory[detectOS()], fontFilename));

//   try {
//     try {
//       const info = Deno.statSync(destPath);
//       if (info.isFile) {
//         log.info("RictyDiminished is exist.");
//         return;
//       }
//     } catch (_error) {
//       // not exist
//     }

//     execute("wget", url, "-O", downloadPath);
//     execute("tar", "-zxvf", downloadPath, "-C", dirname(downloadPath));
//     moveSync(fontPath, destPath);
//   } catch (error) {
//     log.warning(error);
//   }
// };

const RictyDiminished = () => {
  const files = ["RictyDiminished-Regular.ttf"];
  for (const file of files) {
    const source = resolve(join(__dirname(import.meta.url), file));
    const to = resolve(join(userFontDirectory[detectOS()], file));

    // cannot symlink
    copySync(source, to, { overwrite: true });
  }
};

// for terminal
const SourceCodeProForPowerline = async () => {
  const url =
    "https://github.com/powerline/fonts/raw/master/SourceCodePro/Source Code Pro for Powerline.otf";
  const fontFilename = basename(url);
  const downloadPath = resolve(join(downloadDirectory, fontFilename));
  const destPath = resolve(join(userFontDirectory[detectOS()], fontFilename));

  try {
    try {
      const info = Deno.statSync(destPath);
      if (info.isFile) {
        log.debug("SourceCodeProForPowerline is exist.");
        return;
      }
    } catch (_error) {
      // not exist
    }

    execute("wget", url, "-O", downloadPath);

    const hash = Deno.readFileSync(downloadPath);
    await hashCheck(hash, "SHA-256", HASH["Source Code Pro for Powerline"]);

    moveSync(downloadPath, destPath);
  } catch (error) {
    log.warning(error);
  }
};

export default modular({
  name: "fonts",

  needs: [],

  install: async () => {
    RictyDiminished();
    await SourceCodeProForPowerline();
  },

  update: async () => {},

  uninstall: async () => {},
});
