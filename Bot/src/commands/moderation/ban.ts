import {
  GuildMember,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";
import Messages from "../../middlewares/Messages/Messages";
import Logger from "../../logger/Logger";

const ban = {
  description: "Ban un membre",

  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban un member")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.BanMembers)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Le membre à ban")
        .setRequired(true)
    ),

  async run(interaction) {
    let member = interaction.options.getMember("target") as GuildMember;
    if (!member.bannable)
      return Messages.sendError(interaction, "Je ne peux pas ban ce membre");

    try {
      await member.kick();
      Messages.sendSuccess(interaction, "Le membre a été ban avec succès !");
    } catch (e) {
      Logger.logError(e);
      Messages.sendError(interaction, "Une erreur est survenue");
    }
  },
};

export default ban;
