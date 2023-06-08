import { exec } from "./../../utils/exec.ts";

export const isCloned = async (owner: string, repository: string) => {
  const name = owner + "/" + repository;
  const { stdoutString } = await exec(
    "ghq",
    { args: ["list", name] },
    { streaming: false }
  );

  // include at the end `\n` everytime
  const isOnlyRepository = stdoutString?.split("\n").length === 2;
  const isMyRepository = stdoutString?.trim().endsWith(name);
  return isOnlyRepository && isMyRepository;
};
