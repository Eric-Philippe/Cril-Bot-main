import { Client, Events, PermissionFlagsBits } from "discord.js";

import Entry from "../app/Entry/Entry";
import { CHAN_DPLACE, ENTRY_CHANNELS } from "../config/config.guild";
import threadLogger from "../utils/ThreadLogger";

export default (client: Client) => {
  client.on(Events.MessageCreate, async (msg) => {
    if (msg.author.bot) return;

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
