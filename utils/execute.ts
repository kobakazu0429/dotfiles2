import { log } from "./logger.ts";

type Options =
  | Partial<
      Omit<Deno.CommandOptions, "args" | "stdin" | "stdout" | "stderr">
    > & {
      silent: boolean;
      streaming: boolean;
    };

export const execute = (
  command: string,
  ...options: Array<string | Partial<Options>>
) => {
  const { silent, streaming, ...$options } = {
    silent: false,
    streaming: true,
    ...(typeof options.at(-1) === "object"
      ? (options.pop() as Partial<Options>)
      : {}),
  };
  const args = options as string[];
  const std = silent ? "null" : streaming ? "inherit" : "piped";

  log.debug(`$ ${command} ${args.join(" ")}`);
  const $command = new Deno.Command(command, {
    ...$options,
    args,
    stdin: "inherit",
    stdout: std,
    stderr: std,
  });

  const result: Deno.CommandOutput & {
    stdoutString?: string;
    stderrString?: string;
  } = $command.outputSync();

  if (std === "piped") {
    const decoder = new TextDecoder();
    result.stdoutString = decoder.decode(result.stdout);
    result.stderrString = decoder.decode(result.stderr);
  }

  return result;
};
