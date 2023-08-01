import { Client, Events, GuildMember } from "discord.js";
import EntryManager from "../app/Entry/EntryManager";

export default (client: Client) => {
  client.on(Events.GuildMemberAdd, (member) => {
    const memberIn = member as GuildMember;
    EntryManager.createEntry(memberIn);
  });
};
