import { join, resolve, basename, dirname } from "path";
import { moveSync } from "fs";
import { exec } from "./../../utils/exec.ts";
import { os, type OS } from "./../../utils/os.ts";
import {
  homeDir,
  tempDir,
  __dirname,
  XDG_DATA_HOME,
} from "./../../utils/path.ts";
import { log } from "../../utils/logger.ts";

const userFontDirectory: Record<OS, string> = {
  intel_mac: resolve(join(homeDir(), "Library", "Fonts")),
  m1_mac: resolve(join(homeDir(), "Library", "Fonts")),
  ubuntu: resolve(join(XDG_DATA_HOME, "fonts")),
};

const downloadDirectory = tempDir();

// for VSCode
const RictyDiminished = () => {
  // find download url from https://rictyfonts.github.io/diminished
  const url =
    "https://rictyfonts.github.io/files/ricty_diminished-4.1.1.tar.gz";

  const downloadPath = resolve(join(downloadDirectory, basename(url)));
  const fontFilename = "RictyDiminished-Regular.ttf";
  const fontPath = resolve(join(downloadDirectory, fontFilename));
  const destPath = resolve(join(userFontDirectory[os()], fontFilename));

  try {
    Deno.statSync(destPath);

    exec(
      "wget",
      {
        args: [url, "-O", downloadPath],
      },
      true
    );
    exec(
      "tar",
      {
        args: ["-zxvf", downloadPath, "-C", dirname(downloadPath)],
      },
      true
    );
    moveSync(fontPath, destPath);
  } catch (error) {
    log.warning(error);
  }
};

// for terminal
const SourceCodeProForPowerline = () => {
  const url =
    "https://github.com/powerline/fonts/raw/master/SourceCodePro/Source Code Pro for Powerline.otf";
  const fontFilename = basename(url);
  const downloadPath = resolve(join(downloadDirectory, fontFilename));
  const destPath = resolve(join(userFontDirectory[os()], fontFilename));

  try {
    Deno.statSync(destPath);

    exec(
      "wget",
      {
        args: [url, "-O", downloadPath],
      },
      true
    );
    moveSync(downloadPath, destPath);
  } catch (error) {
    log.warning(error);
  }
};

export default () => {
  RictyDiminished();
  SourceCodeProForPowerline();
};
