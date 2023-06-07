import { log } from "./logger.ts";

export type Module = {
  name: string;
  install: () => void | Promise<void>;
  update: () => void | Promise<void>;
  cleanup: () => void | Promise<void>;
};

export type Options<Target extends Module> = {
  interceptors: {
    before: (target: Target) => void | Promise<void>;
    after: (target: Target) => void | Promise<void>;
  };
  onFailed: (error: Error, target: Target) => void | Promise<void>;
};

const defaultOptions: Options<Module> = {
  interceptors: {
    before: (target) => {
      log.info(`Installing ${target.name}...`);
    },
    after: (target) => {
      log.info(`Installed ${target.name}.`);
    },
  },
  onFailed: (error, target) => {
    log.error(`Failed to install ${target.name}.`);
    log.error(error);
  },
};

export const modular = <MyModule extends Module>(
  module: MyModule,
  options: Options<MyModule> = {} as Options<MyModule>
) => {
  options = { ...defaultOptions, ...options };

  const proxy = new Proxy(module, {
    get(target, prop) {
      // @ts-expect-error
      const property = target[prop];
      if (typeof property === "function") {
        return async (...args: unknown[]) => {
          await options.interceptors.before(target);
          try {
            await property(...args);
          } catch (error) {
            await options.onFailed(error, target);
          }
          await options.interceptors.after(target);
        };
      }
      return property;
    },
  });

  return proxy;
};
