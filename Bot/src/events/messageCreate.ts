import { Client, Events, PermissionFlagsBits } from "discord.js";

import Entry from "../app/Entry/Entry";
import { CHAN_DPLACE, ENTRY_CHANNELS } from "../config/config.guild";
import threadLogger from "../utils/ThreadLogger";
import Logger from "../logger/Logger";
import { LogsGeneralLevels } from "../logger/LogsGeneral.Levels";

const problematicUsers = new Set();

export default (client: Client) => {
  client.on(Events.MessageCreate, async (msg) => {
    if (msg.author.bot) return;

    // If the message contains a discord invite link
    if (
      msg.content.match(/discord.gg/) &&
      !msg.member.permissions.has(PermissionFlagsBits.DeafenMembers)
    ) {
      await msg.delete();

      if (problematicUsers.has(msg.author.id)) {
        try {
          await msg.member.kick();
          await msg.author.send(
            "Please do not send discord invite links in the server"
          );

          Logger.logGeneral(
            LogsGeneralLevels.WARNING,
            `User ${msg.author.tag} sent more than one discord invite link in the server and gets kicked`
          );

          return;
        } catch (e) {
          Logger.logError(e);
        }
      } else {
        problematicUsers.add(msg.author.id);
        setTimeout(() => {
          problematicUsers.delete(msg.author.id);
        }, 1000 * 60 * 5);
      }
    }

    const channel = msg.channel;
    if (
      channel.id === CHAN_DPLACE &&
      !msg.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      await threadLogger(msg);
      await msg.delete();
    }

    const hasTempRole = Entry.getTempRole(msg.member) != null;
    if (hasTempRole) {
      if (ENTRY_CHANNELS.includes(channel.id)) {
        await threadLogger(msg);
        await msg.delete();
      }
    }
  });
};
