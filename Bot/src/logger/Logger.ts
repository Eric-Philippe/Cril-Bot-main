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

/**
 * @class Logger
 * @description This class is used to log messages in the database and in the runtime file
 * @property {Logger} LoggerRuntime The instance of the runtime logger
 */
export default class Logger {
  private static LoggerRuntime = LogsRuntime.getInstance();

  /**
   * Log a General message in the database and in the runtime file
   * @param level LogsGeneralLevels enum
   * @param msg The message to log
   */
  public static logGeneral(level: LogsGeneralLevels, msg: string) {
    let entity = new LogsGeneral();
    entity.entryDate = new Date();
    entity.type = LogsGeneralLevels[level];
    entity.msg = msg;

    this.LoggerRuntime.log(LogsLevels.INFO, entity.msg);
    AppDataSource.getRepository(LogsGeneral).save(entity);
  }

  /**
   * Log an Error message in the database and in the runtime file
   * @param error The error to log
   */
  public static logError(error: Error) {
    let entity = new LogsError();
    entity.entryDate = new Date();
    entity.errorType = error.name;
    entity.msg = error.message;
    entity.stackTrace = Logger.getStackTrace(error);

    this.LoggerRuntime.log(LogsLevels.ERROR, entity.stackTrace);
    AppDataSource.getRepository(LogsError).save(entity);
  }

  /**
   * Log a Coaching message in the database and in the runtime file
   * @param userId User id
   * @param msg The message to log
   */
  public static logCoaching(userId: string, msg: string) {
    let entity = new LogsCoaching();
    entity.entryDate = new Date();
    entity.userId = userId;
    entity.msg = msg;

    this.LoggerRuntime.log(LogsLevels.COACHING, entity.msg);
    AppDataSource.getRepository(LogsCoaching).save(entity);
  }

  /**
   * Log a CoachingI message in the database and in the runtime file
   * @param userId User id
   * @param type LogsCoachingITypes enum
   * @param msg The message to log
   */
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

  /**
   * Log an Entry message in the database and in the runtime file
   * @param userid User id
   * @param msg The message to log
   */
  public static logEntry(userid: string, msg: string) {
    let entity = new LogsEntry();
    entity.entryDate = new Date();
    entity.userId = userid;
    entity.msg = msg;

    this.LoggerRuntime.log(LogsLevels.ENTRY, entity.msg);
    AppDataSource.getRepository(LogsEntry).save(entity);
  }

  /**
   * Get the stack trace of an error
   * @param error The error
   * @returns {string} The stack trace
   * @private
   */
  private static getStackTrace(error: Error) {
    return error.stack
      ?.split("\n")
      .slice(1)
      .map((line) => line.trim())
      .join("\n");
  }
}
