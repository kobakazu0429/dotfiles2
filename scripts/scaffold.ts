import { join, resolve } from "path";
import { __dirname } from "../utils/path.ts";
import { exitGeneralErrors } from "./../utils/exit.ts";

const name = prompt("enter module name:");
if (!name) {
  console.log(`module name: ${name}`);
  exitGeneralErrors();
}

const dirPath = resolve(
  join(__dirname(import.meta.url), "..", "modules", name!)
);
const modPath = resolve(join(dirPath, "mod.ts"));

Deno.mkdirSync(dirPath, { recursive: true });

try {
  const infoM = Deno.statSync(modPath);
  if (infoM.isFile) {
    throw new Error("mod.ts already exists!");
  }
} catch (error) {
  if (error.name !== "NotFound") {
    console.error(error);
    exitGeneralErrors();
  }
}

try {
  const templateFile = resolve(
    join(__dirname(import.meta.url), "..", "templates", "basic", "mod.ts")
  );
  Deno.copyFileSync(templateFile, modPath);
  console.log(`Create module: ${name} and scaffolded it!`);
} catch (error) {
  console.error(error);
  exitGeneralErrors();
}
