import { execute } from "./../../utils/execute.ts";

export const isCloned = (owner: string, repository: string) => {
  const name = owner + "/" + repository;
  const { stdoutString } = execute("ghq", "list", name, { streaming: false });

  // include at the end `\n` everytime
  const isOnlyRepository = stdoutString?.split("\n").length === 2;
  const isMyRepository = stdoutString?.trim().endsWith(name);
  return isOnlyRepository && isMyRepository;
};
