import { log } from "./logger.ts";

export const exec = (
  command: ConstructorParameters<typeof Deno.Command>[0],
  options: ConstructorParameters<typeof Deno.Command>[1],
  silent = false
) => {
  log.debug(`$ ${command} ${options?.args?.join(" ")}`);
  const result = new Deno.Command(command, options);
  const { code, stdout, stderr } = result.outputSync();
  const status = code === 0;
  const stdoutString = new TextDecoder().decode(stdout);
  const stderrString = new TextDecoder().decode(stderr);

  if (!silent) {
    if (stdoutString) log.debug(stdoutString);
    if (stderrString)
      if (status) {
        log.warning(stderrString);
      } else {
        log.error(stderrString);
      }
  }

  return { code, status, stdoutString, stderrString };
};
