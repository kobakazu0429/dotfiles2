import { log } from "../utils/logger.ts";
import { intelMac } from "./install_drawin_intel.ts";

const { os, arch } = Deno.build;

if (os === "darwin" && arch === "x86_64") {
  intelMac();
} else {
  log.info("not support os and arch");
}
