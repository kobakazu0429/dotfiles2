#! /usr/bin/env zx
import path from "node:path";

const showCommandOutput = () => {
  $.verbose = true;
};
const hiddenCommandOutput = () => {
  $.verbose = false;
};

hiddenCommandOutput();

// zx crop.mjs target 1 1
const [target, _isWide, _debug] = process.argv.slice(3);

console.log({ target, _isWide, _debug });

const debug = !!_debug;
const isWide = !!_isWide;

console.log("Mode: ", chalk.yellow.bold(isWide ? "Wide" : "Single"));

const H = await $`identify -format "%h" ${target}`;
// const ratio = 960 / 1280;
const ratio = 910 / 1180;
const W = H * ratio;

showCommandOutput();

const outputName = path.basename(target);

console.log("Targte File is ", target);
console.log("Output File is ", `croped_${outputName}`);

await $`convert ${target} -gravity center -crop ${
  isWide ? 2 * W : W
}x${H}+0+0 croped_${outputName}`;
