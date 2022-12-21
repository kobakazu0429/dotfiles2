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
  log.info(`Install ${moduleName} Start.`);
  const result = await run(moduleName, "install");
  log.info(`Install ${moduleName} Done.`);
  return result;
};

export const update = async (moduleName: string) => {
  log.info(`Update ${moduleName} Start.`);
  const result = await run(moduleName, "update");
  log.info(`Update ${moduleName} Done.`);
  return result;
};
