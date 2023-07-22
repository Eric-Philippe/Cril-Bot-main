import { AppDataSource } from "../data-source";
import { LogsLevels } from "./Logs.levels";
import { LogsGeneral } from "../entities/LogsGeneral";
import { LogsError } from "../entities/LogsError";
import { LogsGeneralLevels } from "./LogsGeneral.Levels";
import { LogsCoaching } from "../entities/LogsCoaching";
import { LogsCoachingITypes } from "./LogsCoachingI.types";
import { LogsCoachingI } from "../entities/LogsCoachingI";
import { LogsEntry } from "../entities/LogsEntry";
import LogsRuntime from "./LogsRuntime";

export default class Logger {
  private static LoggerRuntime = LogsRuntime.getInstance();

  public static logGeneral(level: LogsGeneralLevels, msg: string) {
    let entity = new LogsGeneral();
    entity.entryDate = new Date();
    entity.type = LogsGeneralLevels[level];
    entity.msg = msg;

    this.LoggerRuntime.log(LogsLevels.INFO, entity.msg);
    AppDataSource.getRepository(LogsGeneral).save(entity);
  }

  public static logError(error: Error) {
    let entity = new LogsError();
    entity.entryDate = new Date();
    entity.errorType = error.name;
    entity.msg = error.message;
    entity.stackTrace = Logger.getStackTrace(error);

    this.LoggerRuntime.log(LogsLevels.ERROR, entity.stackTrace);
    AppDataSource.getRepository(LogsError).save(entity);
  }

  public static logCoaching(userId: string, msg: string) {
    let entity = new LogsCoaching();
    entity.entryDate = new Date();
    entity.userId = userId;
    entity.msg = msg;

    this.LoggerRuntime.log(LogsLevels.COACHING, entity.msg);
    AppDataSource.getRepository(LogsCoaching).save(entity);
  }

  public static logCoachingI(
    userId: string,
    type: LogsCoachingITypes,
    msg: string
  ) {
    let entity = new LogsCoachingI();
    entity.entryDate = new Date();
    entity.userId = userId;
    entity.action = LogsCoachingITypes[type];
    entity.msg = msg;

    this.LoggerRuntime.log(LogsLevels.COACHINGI, entity.msg);
    AppDataSource.getRepository(LogsCoachingI).save(entity);
  }

  public static logEntry(userid: string, msg: string) {
    let entity = new LogsEntry();
    entity.entryDate = new Date();
    entity.userId = userid;
    entity.msg = msg;

    this.LoggerRuntime.log(LogsLevels.ENTRY, entity.msg);
    AppDataSource.getRepository(LogsEntry).save(entity);
  }

  private static getStackTrace(error: Error) {
    return error.stack
      ?.split("\n")
      .slice(1)
      .map((line) => line.trim())
      .join("\n");
  }
}
