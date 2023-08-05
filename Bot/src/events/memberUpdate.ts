import { Client, Events } from "discord.js";
import Logger from "../logger/Logger";

const COMPLETED_ONBOARDING = "CompletedOnboarding";
const COMPLETED_HOME_ACTIONS = "CompletedHomeActions";

export default (client: Client) => {
  client.on(Events.GuildMemberUpdate, (member, newMember) => {
    const oldMemberFlags = member.flags.toArray();
    const newMemberFlags = newMember.flags.toArray();

    if (
      newMemberFlags.includes(COMPLETED_ONBOARDING) &&
      !oldMemberFlags.includes(COMPLETED_ONBOARDING)
    ) {
      Logger.logEntry(
        member.id,
        `${member.user.username} completed onboarding`
      );
    } else if (
      newMemberFlags.includes(COMPLETED_HOME_ACTIONS) &&
      !oldMemberFlags.includes(COMPLETED_HOME_ACTIONS)
    ) {
      Logger.logEntry(
        member.id,
        `${member.user.username} completed home actions`
      );
    }
  });
};
