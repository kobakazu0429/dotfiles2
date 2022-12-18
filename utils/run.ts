import { resolve, join } from "path";
import { __dirname } from "./path.ts";

type Script = "install";

const run = async (moduleName: string, script: Script) => {
  const modulePath = resolve(
    join(__dirname(import.meta.url), "..", moduleName, script + ".ts")
  );
  const module = await import(modulePath);
  return module.defaut();
};

export const install = async (moduleName: string) => {
  return await run(moduleName, "install");
};
