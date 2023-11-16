import { log } from "./logger.ts";

export type Fns = "install" | "update" | "uninstall";

export type Module = {
  name: string;
} & { [Fn in Fns]: () => void };

export type Options<Target extends Module> = {
  interceptors: {
    before: (prop: Fns, target: Target) => void;
    after: (prop: Fns, target: Target) => void;
  };
  onFailed: (error: Error, prop: Fns, target: Target) => void;
};

const messageMapper: Record<
  Fns,
  Record<
    | keyof Omit<Options<Module>, "interceptors">
    | keyof Options<Module>["interceptors"],
    string
  >
> = {
  install: {
    before: "Installing",
    after: "Installed",
    onFailed: "install",
  },
  update: {
    before: "Updating",
    after: "Updated",
    onFailed: "update",
  },
  uninstall: {
    before: "Uninstalling",
    after: "Uninstalled",
    onFailed: "uninstall",
  },
};

const defaultOptions: Options<Module> = {
  interceptors: {
    before: (prop, target) => {
      log.info(`${messageMapper[prop]["before"]} ${target.name}.`);
    },
    after: (prop, target) => {
      log.info(`${messageMapper[prop]["after"]} ${target.name}.`);
    },
  },
  onFailed: (error, prop, target) => {
    log.error(`Failed to ${messageMapper[prop]["onFailed"]} ${target.name}.`);
    log.error(error);
  },
};

const isFns = (prop: unknown): prop is Fns => {
  if (typeof prop !== "string")
    throw new Error(`\`prop\` is ${typeof prop}, expected string. (${prop})`);

  if (!["install", "update", "uninstall"].includes(prop))
    throw new Error(
      `\`prop\` is ${prop}, expected install, update or uninstall.`
    );

  return true;
};

export const modular = <MyModule extends Module>(
  module: MyModule,
  options: Options<MyModule> = {} as Options<MyModule>
) => {
  options = { ...defaultOptions, ...options };

  const proxy = new Proxy(module, {
    get(target, prop) {
      if (isFns(prop)) {
        const property = target[prop];
        if (typeof property === "function") {
          return () => {
            options.interceptors.before(prop, target);
            try {
              property();
            } catch (error) {
              options.onFailed(error, prop, target);
            }
            options.interceptors.after(prop, target);
          };
        }
        return property;
      }
    },
  });

  return proxy;
};
