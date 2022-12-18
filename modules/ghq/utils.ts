import { exec } from "./../../utils/exec.ts";

export const isExist = (owner: string, repository: string) => {
  const name = owner + "/" + repository;
  const { stdoutString } = exec("ghq", { args: ["list", name] }, true);

  // include at the end `\n` everytime
  const isOnlyRepository = stdoutString.split("\n").length === 2;
  const isMyRepository = stdoutString.trim().endsWith(name);
  return isOnlyRepository && isMyRepository;
};
