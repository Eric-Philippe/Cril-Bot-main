import { openSync, appendFileSync, writeFile } from "node:fs";
import { getDayToMs } from "../utils/Date";
import { LogsLevels } from "./Logs.levels";

/** Logs path from the workfolder */
const FILE_PATH = "logs/runtime.log";

export default class LogsRuntime {
  private static instance = new LogsRuntime();

  private constructor() {
    LogsRuntime.getRuntimeFile();
    LogsRuntime.emptyRuntimeFile();
  }

  public static getInstance() {
    return this.instance;
  }

  public log(type: LogsLevels, msg: string) {
    let msgLog = `[${LogsLevels[type]}] ${getDayToMs()} ${msg}\n`;
    appendFileSync(FILE_PATH, msgLog);
  }

  /**
   * Throw an error if the file doesn't exist
   */
  private static getRuntimeFile() {
    try {
      openSync(FILE_PATH, "r");
    } catch (error) {
      throw new Error("Runtime file doesn't exist");
    }
  }

  private static emptyRuntimeFile() {
    // EMpty the whole file
    writeFile(FILE_PATH, "", (err) => {
      if (err) throw err;
    });
  }
}
