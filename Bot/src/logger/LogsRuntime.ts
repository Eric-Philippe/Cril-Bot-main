import { openSync, appendFileSync, writeFile } from "node:fs";
import { getDayToMs } from "../utils/Date";
import { LogsLevels } from "./Logs.levels";

/** Logs path from the workfolder */
const FILE_PATH = "logs/runtime.log";

/**
 * @class LogsRuntime
 * @description This class is used to log runtime messages
 * @warn The lifetime of this class is the lifetime of the bot; when the bot is launched, the runtime file is created and emptied
 * @property {LogsRuntime} instance The instance of the class
 */
export default class LogsRuntime {
  private static instance = new LogsRuntime();

  private constructor() {
    // LogsRuntime.getRuntimeFile();
    // LogsRuntime.emptyRuntimeFile();
  }

  /**
   * Get the instance of the Logger
   * @returns {LogsRuntime} The instance of the class
   */
  public static getInstance() {
    return this.instance;
  }

  /**
   * Log a message in the runtime file
   * @description Add a line in the runtime file [TYPE] DD/MM/YYYY HH:MM:SS:MS MESSAGE
   * @param type LogsLevels enum
   * @param msg The message to log
   */
  public log(type: LogsLevels, msg: string) {
    let msgLog = `[${LogsLevels[type]}] ${getDayToMs()} ${msg}\n`;
    console.log(msgLog);
  }

  /**
   * Throw an error if the file doesn't exist
   */
  private static getRuntimeFile() {
    try {
      openSync(FILE_PATH, "r");
    } catch (error) {
      writeFile(FILE_PATH, "", (err) => {
        if (err) throw new Error("Runtime file doesn't exist");
      });
    }
  }

  /**
   * Empty the runtime file
   */
  private static emptyRuntimeFile() {
    // EMpty the whole file
    writeFile(FILE_PATH, "", (err) => {
      if (err) throw err;
    });
  }
}
