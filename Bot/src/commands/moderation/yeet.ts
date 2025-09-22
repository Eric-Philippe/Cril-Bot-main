import {
  GuildMember,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";
import Messages from "../../middlewares/Messages/Messages";
import Logger from "../../logger/Logger";
import { Command } from "../../models/Command";

const yeet: Command = {
  description: "Yeet un membre",

  data: new SlashCommandBuilder()
    .setName("yeet")
    .setDescription("yeet un member")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.PrioritySpeaker)
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Le membre à yeet")
        .setRequired(true)
    ) as SlashCommandBuilder,
  async run(interaction) {
    let member = interaction.options.getMember("target") as GuildMember;
    // Remove the user from the vocal if he is in one
    if (member.voice.channel) {
      try {
        await member.voice.disconnect();
      } catch (e) {
        Logger.logError(e);
        Messages.sendError(interaction, "Une erreur est survenue");
      }
    }

    try {
      member.timeout(20 * 60 * 1000, `User yeeted by ${interaction.user.tag}`);
      Messages.sendSuccess(interaction, "Le membre a été yeet avec succès !");
    } catch (e) {
      Logger.logError(e);
      Messages.sendError(interaction, "Une erreur est survenue");
    }
  },
};

export default yeet;
