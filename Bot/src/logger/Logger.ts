import { LoggerTypes } from "./Logger.types";

const LOGS_FOLDER = "./logs";

class Logger {
  private static instances: { [key in LoggerTypes]: Logger } = {
    [LoggerTypes.GENERAL]: new Logger(LoggerTypes.GENERAL),
    [LoggerTypes.ENTRY]: new Logger(LoggerTypes.ENTRY),
    [LoggerTypes.ERROR]: new Logger(LoggerTypes.ERROR),
    [LoggerTypes.RUNTIME]: new Logger(LoggerTypes.RUNTIME),
    [LoggerTypes.COACHING]: new Logger(LoggerTypes.COACHING),
    [LoggerTypes.COACHING_I]: new Logger(LoggerTypes.COACHING_I),
  };

  private constructor(private readonly type: LoggerTypes) {}

  private static getStackTrace(error: Error) {
    return error.stack
      ?.split("\n")
      .slice(1)
      .map((line) => line.trim())
      .join("\n");
  }

  public static get(type: LoggerTypes): Logger {
    return Logger.instances[type];
  }
}

enum LoggerPlatforms {
  DATABASE,
  FILE,
}

interface LoggerMetadata {
  type: LoggerTypes;
  platform: LoggerPlatforms;
  plateformName: string;
}

const loggerMetadata: LoggerMetadata[] = [
  {
    type: LoggerTypes.ENTRY,
    platform: LoggerPlatforms.DATABASE,
    plateformName: "LOGS_GENERAL",
  },
];
