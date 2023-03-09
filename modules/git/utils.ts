import { log } from "../../utils/logger.ts";
import { exec } from "./../../utils/exec.ts";

export const testSSHConnection = () => {
  const { stderrString } = exec(
    "ssh",
    { args: ["-T", "git@github.com"] },
    true
  );

  const result = stderrString.startsWith(
    "Hi kobakazu0429! You've successfully authenticated"
  );

  if (result) {
    log.debug("Successfully, Connected to GitHub with SSH.");
  } else {
    log.debug("Failed, Connected to GitHub with SSH.");
  }

  return result;
};
