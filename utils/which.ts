import { exec } from "./exec.ts";

export const which = (command: string) => {
  const result = exec(
    "which",
    {
      args: [command],
    },
    true
  );
  return result.status;
};
