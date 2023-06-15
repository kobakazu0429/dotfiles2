import { log } from "./logger.ts";

export type Module = {
  name: string;
  install: () => void;
  update: () => void;
  cleanup: () => void;
};

export type Options<Target extends Module> = {
  interceptors: {
    before: (target: Target) => void;
    after: (target: Target) => void;
  };
  onFailed: (error: Error, target: Target) => void;
};

const defaultOptions: Options<Module> = {
  interceptors: {
    before: (target) => {
      log.info(`Installing ${target.name}.`);
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
        return (...args: unknown[]) => {
          options.interceptors.before(target);
          try {
            property(...args);
          } catch (error) {
            options.onFailed(error, target);
          }
          options.interceptors.after(target);
        };
      }
      return property;
    },
  });

  return proxy;
};
