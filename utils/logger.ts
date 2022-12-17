import * as Logger from "log";

const formatter = ({ datetime, levelName, msg }: Logger.LogRecord) => {
  const d = new Date(datetime.getTime() - datetime.getTimezoneOffset() * 6e4);
  const logTime = d.toISOString().slice(0, -5).replace("T", " ");
  const prefix = `[${logTime}][${levelName}]${" ".repeat(
    7 - levelName.length
  )}:`;

  return msg
    .split("\n")
    .map((m) => `${prefix} ${m}`)
    .join("\n");
};

Logger.setup({
  handlers: {
    console: new Logger.handlers.ConsoleHandler("DEBUG", {
      formatter,
    }),
  },

  loggers: {
    default: {
      level: "DEBUG",
      handlers: ["console"],
    },
  },
});

const log = Logger.getLogger();

export { log };
