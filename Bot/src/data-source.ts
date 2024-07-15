import "reflect-metadata";
import client from "./client";
import { Events } from "./events/Events.types";
import { DataSource } from "typeorm";

import { LogsCoaching } from "./entities/LogsCoaching";
import { LogsCoachingI } from "./entities/LogsCoachingI";
import { LogsEntry } from "./entities/LogsEntry";
import { LogsError } from "./entities/LogsError";
import { LogsGeneral } from "./entities/LogsGeneral";
import { CurrentSpreadsheets } from "./entities/CurrentSpreadsheets";
import { InscriptionsAtelier } from "./entities/InscriptionsAtelier";
import { InscriptionsCoaching } from "./entities/InscriptionsCoaching";
import { Timer } from "./utils/Timer";
import { Poll } from "./entities/Poll";
import { TossParticipants } from "./entities/TossParticipants";
import { TossState } from "./entities/TossState";
import { LogsDplace } from "./entities/LogsDplace";
import { DplaceData } from "./entities/DplaceData";
import { DB_URL, POSTGRES_DB } from "./config/config.database";

/** ORM DataSource Main Access / Setup */
export const AppDataSource = new DataSource({
  type: "postgres",
  url: DB_URL,
  synchronize: true,
  logging: false,
  entities: [
    LogsCoaching,
    LogsCoachingI,
    LogsEntry,
    LogsError,
    LogsGeneral,
    CurrentSpreadsheets,
    InscriptionsAtelier,
    InscriptionsCoaching,
    Poll,
    TossParticipants,
    TossState,
    LogsDplace,
    DplaceData,
  ],
  migrations: [],
  subscribers: [],
});

/** Initialize the ORM DataSource */
AppDataSource.initialize()
  .then(() => {
    // Database is ready
    client.emit(Events.DatabaseReady, POSTGRES_DB);
  })
  .catch((error) => console.log(error));

export const getDbMetrics = async () => {
  let repo = AppDataSource.getRepository(LogsGeneral);
  let t = new Timer();
  t.start();
  try {
    await repo.count();
    t.stop();
    return t.toMsInt();
  } catch (err) {
    return -1;
  }
};
