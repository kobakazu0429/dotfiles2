import { exec } from "./exec.ts";

export const which = (command: string) => {
  const result = exec("which", {
    args: [command],
  });
  return result.status;
};
