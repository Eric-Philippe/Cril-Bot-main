import { Client, Events } from "discord.js";
import interactionCreate from "./interactionCreate";
import Logger from "../logger/Logger";
import { LogsGeneralLevels } from "../logger/LogsGeneral.Levels";

export default (client: Client) => {
  client.once(Events.ClientReady, (c) => {
    console.log(`%c 🤖 Bot logged in ${client.user.tag}`, "color: #eb4034");
    Logger.logGeneral(
      LogsGeneralLevels.WARNING,
      `Ma chérie est trop belle attention`
    );
    interactionCreate(client);
  });
};
