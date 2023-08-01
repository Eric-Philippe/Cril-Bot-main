import { Client, Events } from "discord.js";
import EntryManager from "../app/Entry/EntryManager";

export default (client: Client) => {
  client.on(Events.GuildMemberRemove, (member) => {
    const entry = EntryManager.getEntry(member.id);
    if (entry) entry.clean();
  });
};
