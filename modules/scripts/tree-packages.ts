#!/usr/bin/env -S deno run --allow-read --ext=ts
import { expandGlob } from "jsr:@std/fs";
import { join } from "jsr:@std/path";
import { parseArgs } from "node:util";

interface PkgJson {
  name: string;
  workspaces: string[];
  dependencies?: Record<string, string>;
}

const parsed = parseArgs({
  args: Deno.args,
  options: {
    prefx: {
      type: "string",
      short: "p",
      multiple: true,
    },
  },
});

const rootPkg: PkgJson = JSON.parse(
  Deno.readTextFileSync(join(Deno.cwd(), "package.json"))
);

const { workspaces } = rootPkg;

const workspacePkgPaths = (
  await Promise.all(
    workspaces.map((workspace) =>
      Array.fromAsync(expandGlob(join(workspace, "**", "package.json")))
    )
  )
).flat();

const workspacePkgs = (
  await Promise.all(
    workspacePkgPaths.map(({ path }) => Deno.readTextFile(path))
  )
)
  .map((pkgJsonStr) => JSON.parse(pkgJsonStr) as PkgJson)
  .filter((pkg) => {
    if (!parsed.values.prefx) return true;
    return parsed.values.prefx.some((prefix) => pkg.name.startsWith(prefix));
  })
  .toSorted((a, b) => a.name.localeCompare(b.name));

const pkgNames = new Set();

for (const pkg of workspacePkgs) {
  pkgNames.add(pkg.name);
}

for (const pkg of workspacePkgs) {
  console.log(pkg.name);

  const deps = Object.keys(pkg.dependencies ?? {})
    .filter((d) => pkgNames.has(d))
    .toSorted((a, b) => a.localeCompare(b));

  for (let i = 0; i < deps.length; i++) {
    const isLast = i === deps.length - 1;
    const branch = isLast ? "└── " : "├── ";
    const dep = deps[i];
    console.log(branch + dep);
  }
  console.log();
}
