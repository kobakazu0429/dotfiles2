#! /usr/bin/env zx

async function main() {
  const [, , _debug] = process.argv;

  const debug = !!_debug;

  const currentDir = process.cwd();

  const ignores = [".DS_Store"];

  const dirs = (await fs.readdir(currentDir)).filter(
    (s) => !(ignores.includes(s) || s.endsWith("rar") || s.endsWith("zip"))
  );

  for (const dir of dirs) {
    console.log(`[rar] `, dir, " \t→\t ", `${dir}.rar`);
  }

  const ok1 = await question("Are you ok ? [yN]: ");
  if (ok1 !== "y") process.exit(0);

  for (const dir of dirs) {
    await $`rar a ${dir}.rar ${dir} -x"**/.*" -qo+`;
  }

  console.log(chalk.bgBlueBright("[cleanup start]"));

  for (const dir of dirs) {
    console.log(`[will removed] `, dir);
  }
  const ok2 = await question(
    "Are you " + chalk.redBright("deleted") + chalk.reset(" ok ? [yN]: ")
  );
  if (ok2 !== "y") process.exit(0);

  for (const dir of dirs) {
    await $`rm -rf ${dir}`;
  }
}

main();
