import { Client, Events } from "discord.js";
import Entry from "../app/Entry/Entry";

export default (client: Client) => {
  client.on(Events.GuildMemberAdd, (member) => {
    new Entry(member);
  });
};
