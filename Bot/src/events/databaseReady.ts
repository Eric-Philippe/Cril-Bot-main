import { Client } from "discord.js";
import { Events } from "./Events.types";
import ready from "./ready";
import { DataSource } from "typeorm";
import LogsRuntime from "../logger/LogsRuntime";
import { LogsLevels } from "../logger/Logs.levels";

let activity = false;

export default (client: Client, appDataSource: DataSource) => {
  client.once(Events.DatabaseReady, (host: string, dbName: string) => {
    activity = true;
    console.log(
      `%c 💾 Database connected on ${host}/${dbName}`,
      "color: #00ff00"
    );
    LogsRuntime.getInstance().log(
      LogsLevels.INFO,
      `Database connected on ${dbName}`
    );
    ready(client);
  });
};

const startTimer = () => {
  setTimeout(() => {
    if (!activity) {
      throw new Error("No activity for 10 seconds. Crashing...");
    }
  }, 10000); // 10 seconds (10000 milliseconds)
};

startTimer();
