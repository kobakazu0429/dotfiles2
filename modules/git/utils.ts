import { exec } from "./../../utils/exec.ts";

export const testSSHConnection = () => {
  const { stderrString } = exec(
    "ssh",
    { args: ["-T", "git@github.com"] },
    true
  );

  return stderrString.startsWith(
    "Hi kobakazu0429! You've successfully authenticated"
  );
};
