import { log } from "./logger.ts";

export const exec = async (
  command: ConstructorParameters<typeof Deno.Command>[0],
  options: ConstructorParameters<typeof Deno.Command>[1],
  silent = false
) => {
  log.debug(`$ ${command} ${options?.args?.join(" ")}`);
  const $command = new Deno.Command(command, {
    ...options,
    stdin: "inherit",
    stdout: silent ? "null" : "inherit",
    stderr: silent ? "null" : "inherit",
  });

  const { success } = await $command.output();
  return { success };
};
