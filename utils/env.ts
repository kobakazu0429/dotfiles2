import { log } from "./logger.ts";

export const envs = ["minimum", "personal"] as const;
export type Env = (typeof envs)[number];

export const getEnv = (): Env => {
  let env = Deno.env.get("DOTFILES_ENV") as Env | undefined;
  if (!env || !envs.includes(env)) {
    log.info("Not specified DOTFILES_ENV, to set `minimum` as default.");
    env = "minimum";
  }
  return env;
};
