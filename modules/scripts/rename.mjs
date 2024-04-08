#! /usr/bin/env zx
import path from "node:path";

const [, , , target, _debug] = process.argv;

const debug = !!_debug;

const currentDir = process.cwd();
const targetPath = path.resolve(path.join(currentDir, target));

const { stdout: DS_Store } = await $`find . -type f -name ".DS_Store"`;
await Promise.all(
  DS_Store.split("\n")
    .filter(Boolean)
    .map((p) => $`rm ${p}`)
);

// const { stdout: cover } = await $`find . -type d -name "cover*"`
// await Promise.all(cover.split("\n").filter(Boolean).filter(c => {
//   console.log(c.match(/cover\d/))
// }).map(p => $`rm ${p}`));

console.log("Targte Path is ", chalk.bgBlueBright(targetPath));

const renames = [];

const dirs = await fs.readdir(targetPath);

for await (const dir of dirs) {
  // let chapter = dir.match(/^((\w+\s?)*\s-\s(Raw )?Chapter )?(\d{3})$/)
  let chapter = dir.match(/(\d{1,4})a?/);
  if (!chapter) chapter = dir.match(/(\d{1,4})_files$/);
  if (debug) console.log(chapter);
  const dirPath = path.resolve(path.join(targetPath, dir));
  if (chapter === null && !dir.match(/cover/g)) {
    switch (dir) {
      case ".DS_Store":
        break;
      default:
        console.log(chalk.bgYellowBright(`[unexpected dir] `, dirPath));
        break;
    }
  } else {
    // chapter = dir === "cover" ? "_cover" : chapter[chapter.length - 1];
    chapter = dir.match(/cover/) ? "000_" : chapter[1];

    const dirPath = path.resolve(path.join(targetPath, dir));
    const files = await fs.readdir(dirPath);
    // console.log(files);
    files.forEach(async (file) => {
      const exts = file.match(/^.*(\.jpg)(\.jpg)$/);
      const filePath = path.resolve(path.join(dirPath, file));
      // console.log(filePath);
      if (exts !== null && exts[1] === exts[2] && exts[2] === ".jpg")
        file = file.replace(".jpg", "");
      const outputPath = path.resolve(
        path.join(targetPath, `${chapter}_${file}`)
      );
      // console.log(outputPath);
      if (path.extname(file) !== ".jpg")
        console.log(`[ext is not .jpg] `, chalk.yellowBright(filePath));

      renames.push({ from: filePath, to: outputPath });
    });
  }
}

for (const rename of renames) {
  console.log(`[will rename] `, rename.from, "\t→\t", rename.to);
}

const ok = await question("Are you ok ? [yN]: ");
if (ok !== "y") process.exit(0);

for (const rename of renames) {
  await $`mv ${rename.from} ${rename.to}`;
}

console.log(chalk.bgBlueBright("[cleanup start]"));

const rmPaths = [];
for await (const dir of dirs) {
  const dirPath = path.resolve(path.join(targetPath, dir));
  if (dir === ".DS_Store") rmPaths.push(dirPath);

  if ((await fs.stat(dirPath)).isDirectory()) {
    const files = await fs.readdir(dirPath);
    if (files.length === 0) rmPaths.push(dirPath);
    else {
      console.log(chalk.bgYellowBright("[contain files] "), dirPath);
    }
  }
}

if (rmPaths.length) {
  for (const rmPath of rmPaths) {
    console.log(`[will removed] `, rmPath);
  }
  const ok = await question("Are you deleted ok ? [yN]: ");
  if (ok !== "y") process.exit(0);

  for (const rmPath of rmPaths) {
    await $`rm -rf ${rmPath}`;
  }
}
