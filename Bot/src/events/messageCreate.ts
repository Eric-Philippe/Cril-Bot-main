import { Client, Events, PermissionFlagsBits } from "discord.js";
import EntryManager from "../app/Entry/EntryManager";
import Entry from "../app/Entry/Entry";
import { CHAN_DPLACE, ENTRY_CHANNELS } from "../config/config.guild";

export default (client: Client) => {
  client.on(Events.MessageCreate, (msg) => {
    const channel = msg.channel;
    if (
      channel.id === CHAN_DPLACE &&
      !msg.member.permissions.has(PermissionFlagsBits.Administrator)
    ) {
      msg.delete();
    }

    const hasTempRole = Entry.getTempRole(msg.member) != null;
    if (hasTempRole) {
      if (ENTRY_CHANNELS.includes(channel.id)) msg.delete();
    }
  });
};
