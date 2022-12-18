import { exec } from "./../../utils/exec.ts";

export const isExist = (owner: string, repository: string) => {
  const name = owner + "/" + repository;
  const { stdoutString } = exec("ghq", {
    args: ["list", name],
  });

  const isOnlyRepository = stdoutString.split("\n").length === 1;
  const isMyRepository = stdoutString.trim().endsWith(name);
  return isOnlyRepository && isMyRepository;
};
