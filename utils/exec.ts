import { log } from "./logger.ts";

type Options = {
  silent: boolean;
  streaming: boolean;
};

export const exec = async (
  command: ConstructorParameters<typeof Deno.Command>[0],
  options: ConstructorParameters<typeof Deno.Command>[1],
  { silent, streaming }: Partial<Options> = { silent: false, streaming: true }
) => {
  const std = silent ? "null" : streaming ? "inherit" : "piped";

  log.debug(`$ ${command} ${options?.args?.join(" ")}`);
  const $command = new Deno.Command(command, {
    ...options,
    stdin: "inherit",
    stdout: std,
    stderr: std,
  });

  const result: Deno.CommandOutput & {
    stdoutString?: string;
    stderrString?: string;
  } = await $command.output();

  if (std === "piped") {
    const decoder = new TextDecoder();
    result.stdoutString = decoder.decode(result.stdout);
    result.stderrString = decoder.decode(result.stderr);
  }

  return result;
};
