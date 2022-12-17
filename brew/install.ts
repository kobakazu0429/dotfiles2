import { join, resolve } from "path";
import { homeDir } from "./../utils/path.ts";
import { symbolicLink } from "./../utils/symbolicLink.ts";

export const installBrewfile = () => {
  const result = symbolicLink(
    resolve(join(Deno.cwd(), "brew", "Brewfile")),
    resolve(join(homeDir(), ".Brewfile"))
  );
  return result;
};
