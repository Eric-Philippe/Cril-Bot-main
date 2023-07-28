import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  PermissionsBitField,
  UserContextMenuCommandInteraction,
} from "discord.js";

import Logger from "../logger/Logger";
import Messages from "../middlewares/Messages/Messages";

import { ContextMenu } from "../models/ContextMenu";

const yeet: ContextMenu = {
  data: new ContextMenuCommandBuilder()
    .setName("Yeet")
    .setType(ApplicationCommandType.User)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.PrioritySpeaker),
  async run(interaction: UserContextMenuCommandInteraction) {
    const user = interaction.options.getUser("user", true);
    const member = interaction.guild.members.cache.get(user.id);
    if (member.voice.channel) {
      try {
        await member.voice.disconnect();
      } catch (e) {
        Logger.logError(e);
      }
    }

    try {
      member.timeout(20 * 60 * 1000, `User yeeted by ${interaction.user.tag}`);
      Messages.sendSuccess(
        interaction,
        `L'utilisateur <@${user.id}> a été yeeté avec succès !! 🤣`
      );
    } catch (e) {
      Logger.logError(e);
      Messages.sendError(interaction, "Une erreur est survenue");
    }
  },
};

export default yeet;
