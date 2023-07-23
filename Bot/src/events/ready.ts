import { Client, Events } from "discord.js";
import interactionCreate from "./interactionCreate";
import LogsRuntime from "../logger/LogsRuntime";
import { LogsLevels } from "../logger/Logs.levels";
import InscriptionManager from "../middlewares/Attendance/InscriptionManager";

export default (client: Client) => {
  client.once(Events.ClientReady, (c) => {
    console.log(`%c 🤖 Bot logged in ${client.user.tag}`, "color: #eb4034");
    LogsRuntime.getInstance().log(
      LogsLevels.INFO,
      `Bot logged in ${client.user.tag}`
    );

    body();
    interactionCreate(client);
  });
};

/**
 * @deprecated
 * Only for debugging purpose
 */
const body = async () => {
  InscriptionManager.refreshInscriptions(
    "17OIbxRCHFXaQFzGR2Y-oN2XBtmfs0q1rueeCVGOSrmU"
  );
};
