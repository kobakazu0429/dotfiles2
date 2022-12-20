import { resolve, join } from "path";
import { log } from "./logger.ts";
import { __dirname } from "./path.ts";

type Script = "install" | "update";

const run = async (moduleName: string, script: Script) => {
  const modulePath = resolve(
    join(
      __dirname(import.meta.url),
      "..",
      "modules",
      moduleName,
      script + ".ts"
    )
  );
  const module = await import(modulePath);
  return module.default();
};

export const install = async (moduleName: string) => {
  log.info(`Install ${moduleName}`);
  return await run(moduleName, "install");
};

export const update = async (moduleName: string) => {
  log.info(`Update ${moduleName}`);
  return await run(moduleName, "update");
};
