import { Client, Events } from "discord.js";
import interactionCreate from "./interactionCreate";
import LogsRuntime from "../logger/LogsRuntime";
import { LogsLevels } from "../logger/Logs.levels";
import { init } from "../app/DPlace/script/initCanvaData";
import memberUpdate from "./memberUpdate";

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
  });
};

/**
 * @deprecated
 * Only for debugging purpose
 */
const body = async () => {};
