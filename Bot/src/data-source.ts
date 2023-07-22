import "reflect-metadata";
import client from "./client";
import { Events } from "./events/Events.types";
import { DataSource } from "typeorm";
import { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } from "./config.database";
import { LogsCoaching } from "./entities/LogsCoaching";
import { LogsCoachingI } from "./entities/LogsCoachingI";
import { LogsEntry } from "./entities/LogsEntry";
import { LogsError } from "./entities/LogsError";
import { LogsGeneral } from "./entities/LogsGeneral";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  synchronize: true,
  logging: false,
  entities: [LogsCoaching, LogsCoachingI, LogsEntry, LogsError, LogsGeneral],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    client.emit(Events.DatabaseReady, DB_HOST, DB_NAME);
  })
  .catch((error) => console.log(error));
