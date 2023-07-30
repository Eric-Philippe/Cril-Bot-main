import { Client, Events } from "discord.js";

export default (client: Client) => {
  client.on(Events.GuildMemberUpdate, (member, newMember) => {});
};
