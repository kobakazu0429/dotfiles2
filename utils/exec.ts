import { log } from "./logger.ts";

export const exec = (
  ...[command, options]: ConstructorParameters<typeof Deno.Command>
): boolean => {
  log.debug(`$ ${command} ${options?.args?.join(" ")}`);
  const result = new Deno.Command(command, options);
  const { code, stdout, stderr } = result.outputSync();
  const stdoutString = new TextDecoder().decode(stdout);
  const stderrString = new TextDecoder().decode(stderr);

  if (stdoutString) log.debug(stdoutString);
  if (stderrString) log.error(stderrString);
  return code === 0;
};
