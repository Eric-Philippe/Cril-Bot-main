import { Client, Events } from "discord.js";
import CoolDownManager from "../utils/CoolDown";
import Entry from "../app/Entry/Entry";

export default (client: Client) => {
  client.on(Events.GuildMemberRemove, (member) => {
    CoolDownManager.softStop(member.id, Entry.CATEGORY_COOLDOWN);
  });
};
