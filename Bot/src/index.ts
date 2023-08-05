import client from "./client";

import "reflect-metadata";

import databaseReady from "./events/databaseReady";
import { AppDataSource } from "./data-source";
import LogsRuntime from "./logger/LogsRuntime";
import { LogsLevels } from "./logger/Logs.levels";

LogsRuntime.getInstance().log(LogsLevels.INFO, "Starting the bot");
databaseReady(client, AppDataSource);
/**
 * @description
 * Database Ready Event will trigger the Discord Bot Ready event
 * Discord Bot Ready event will trigger the Interaction Create event
 *
 * Database => Discord Bot => Interaction Create
 *
 * Like this we ensure that the database is ready before the bot is ready
 */
