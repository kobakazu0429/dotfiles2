#!/usr/bin/env -S deno run --allow-read=Makefile
import { colors } from "https://deno.land/x/cliffy@v1.0.0-rc.3/ansi/colors.ts";

const TARGETS_REGEXP = /^(?<targets>(.+)):\s?(?<prerequisites>(.*))$/;

const target = Deno.args[0];
const makefile = Deno.readTextFileSync("Makefile");

// const targets = makefile
//   .split("\n")
//   .filter((v) => v.startsWith(".PHONY"))
//   .map((v) => v.replaceAll(".PHONY: ", ""));

const recipes = makefile
  .split("\n")
  .filter((v) => !v.startsWith(".PHONY"))
  .filter((v) => !v.startsWith("# "))
  .reduce((acc, cur, i, arr) => {
    if (cur === "") return acc;

    if (i === 0) {
      acc.push([cur]);
    } else if (arr.at(i - 1) === "") {
      acc.push([cur]);
    } else {
      acc.at(-1)?.push(cur);
    }
    return acc;
  }, [] as Array<Array<string>>);

const targetRecipes = recipes
  .map((recipe) => {
    const t = TARGETS_REGEXP.exec(recipe[0]);
    return {
      targets: t?.groups?.targets?.split(" "),
      prerequisites: t?.groups?.prerequisites?.split(" "),
      recipes: recipe.slice(1),
    };
  })
  .filter((v) => {
    return v.targets?.includes(target);
  });

const formated = targetRecipes
  .map((v) => {
    return `
${colors.underline("targets")}
${v.targets?.map((v) => `\t- ${colors.red.bold(v)}`)?.join("\n")}

${colors.underline("prerequisites")}
${v.prerequisites?.map((v) => `\t- ${colors.blue.bold(v)}`)?.join("\n")}

${colors.underline("recipes")}
${v.recipes.join("\n")}
`.trim();
  })
  .join("\n");

console.log(formated);
