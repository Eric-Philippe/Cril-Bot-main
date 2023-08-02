import { Client, Events } from "discord.js";
import interactionCreate from "./interactionCreate";
import LogsRuntime from "../logger/LogsRuntime";
import { LogsLevels } from "../logger/Logs.levels";
import memberUpdate from "./memberUpdate";
import memberJoin from "./memberJoin";
import memberRemove from "./memberRemove";
import messageCreate from "./messageCreate";

export default (client: Client) => {
  client.once(Events.ClientReady, (c) => {
    console.log(`%c 🤖 Bot logged in ${client.user.tag}`, "color: #eb4034");
    LogsRuntime.getInstance().log(
      LogsLevels.INFO,
      `Bot logged in ${client.user.tag}`
    );

    body();
    interactionCreate(client);
    memberUpdate(client);
    memberJoin(client);
    memberRemove(client);
    messageCreate(client);
  });
};

/**
 * @deprecated
 * Only for debugging purpose
 */
const body = async () => {};
