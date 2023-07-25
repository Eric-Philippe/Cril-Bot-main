import {
  GuildMember,
  PermissionsBitField,
  SlashCommandBuilder,
} from "discord.js";
import Messages from "../../middlewares/Messages/Messages";
import Logger from "../../logger/Logger";

const removeperm = {
  description: "Retire les permissions de parler à un membre",

  data: new SlashCommandBuilder()
    .setName("removeperm")
    .setDescription("Retire les permissions de parler à un membre")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.PrioritySpeaker)
    .addUserOption((option) =>
      option.setName("target").setDescription("Le membre").setRequired(true)
    ),

  async run(interaction) {
    // Remove the read messages permission
    let member = interaction.options.getMember("target") as GuildMember;

    try {
      let channel = interaction.channel;
      await channel.permissionOverwrites.edit(member.id, {
        ViewChannel: false,
        SendMessages: true,
      });
      await Messages.sendSuccess(
        interaction,
        `L'utilisateur ${member.user.username} ne peut plus accéder au channel ${channel.name}`
      );
    } catch (e) {
      Logger.logError(e);
      Messages.sendError(interaction, "Une erreur est survenue");
    }
  },
};

export default removeperm;
