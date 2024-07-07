import { log } from "./logger.ts";

export type Commands = "install" | "update" | "uninstall";

export type Module = {
  name: string;
  needs: string[];
} & { [Command in Commands]: () => void | Promise<void> };

export type Options<Target extends Module> = {
  interceptors: {
    before: (command: Commands, target: Target) => void;
    after: (command: Commands, target: Target) => void;
  };
  onFailed: (error: Error, command: Commands, target: Target) => void;
};

const messageMapper: Record<
  Commands,
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
    before: (command, target) => {
      log.info(`${messageMapper[command]["before"]} ${target.name} ...`);
    },
    after: (command, target) => {
      log.info(`${messageMapper[command]["after"]} ${target.name} !`);
      console.log(); // spacing
    },
  },
  onFailed: (error, command, target) => {
    log.error(
      `Failed to ${messageMapper[command]["onFailed"]} ${target.name} :(`
    );
    log.error(error);
  },
};

export const modular = <MyModule extends Module>(
  module: MyModule
): MyModule => {
  const fn = async (command: Commands) => {
    defaultOptions.interceptors.before(command, module);
    try {
      await module[command]();
    } catch (error) {
      defaultOptions.onFailed(error, command, module);
    }
    defaultOptions.interceptors.after(command, module);
  };

  return {
    name: module.name,
    needs: module.needs,
    install: () => fn("install"),
    uninstall: () => fn("uninstall"),
    update: () => fn("update"),
  } as MyModule;
};
