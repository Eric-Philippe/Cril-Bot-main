import {
  GuildMember,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";
import Messages from "../../middlewares/Messages/Messages";
import Logger from "../../logger/Logger";

const kick = {
  description: "Kick un membre",

  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick un member")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.PrioritySpeaker)
    .setDMPermission(false)
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Le membre à kick")
        .setRequired(true)
    ),

  async run(interaction) {
    let member = interaction.options.getMember("target") as GuildMember;
    if (!member.kickable)
      return Messages.sendError(interaction, "Je ne peux pas kick ce membre");

    try {
      await member.kick();
      Messages.sendSuccess(interaction, "Le membre a été kick avec succès !");
    } catch (e) {
      Logger.logError(e);
      Messages.sendError(interaction, "Une erreur est survenue");
    }
  },
};

export default kick;
