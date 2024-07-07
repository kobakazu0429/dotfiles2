import { sortedModules } from "./_modules.ts";
import { detectOS } from "./../utils/os.ts";

const os = detectOS();
if (os === "ubuntu") {
  throw new Error("ubuntu is not supported perfectly :C");
}

for await (const module of sortedModules) {
  await module.install();
}
