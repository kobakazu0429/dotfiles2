import { execute } from "../../utils/execute.ts";
import { log } from "../../utils/logger.ts";
import { modular } from "./../../utils/modular.ts";
import { exitGeneralErrors } from "../../utils/exit.ts";

const checkSSHConnection = () => {
  const { stderrString } = execute("ssh", "-T", "git@github.com", {
    streaming: false,
  });

  const result = stderrString?.startsWith(
    "Hi kobakazu0429! You've successfully authenticated"
  );

  if (result) {
    log.info("Successfully, Connected to GitHub with SSH.");
  } else {
    log.warning("Failed, Connected to GitHub with SSH.");
  }

  return !!result;
};

export default modular({
  name: "ssh",

  install: () => {
    if (checkSSHConnection()) {
      return;
    }

    log.info("Check 1Password");
    exitGeneralErrors();
  },

  update: () => {},

  uninstall: () => {},
});
