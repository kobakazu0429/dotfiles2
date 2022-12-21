import { exec } from "./../../utils/exec.ts";

export default () => {
  const packages = ["zx"];
  exec("yarn", { args: ["global", "add", ...packages] });
};
