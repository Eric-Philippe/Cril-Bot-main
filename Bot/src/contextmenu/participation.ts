import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
  UserContextMenuCommandInteraction,
} from "discord.js";
import { ContextMenu } from "../models/ContextMenu";

const participation: ContextMenu = {
  data: new ContextMenuCommandBuilder()
    .setName("Doesn't speak")
    .setType(ApplicationCommandType.User)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.PrioritySpeaker),
  async run(interaction: UserContextMenuCommandInteraction) {
    const user = interaction.options.getUser("user", true);

    const embed = new EmbedBuilder()
      .setColor("#4f70b8")
      .setDescription(
        "⛔ | Nous ne pouvons pas valider une activité interaction si vous ne parlez pas. \n\n🛠️ | Si vous rencontrez un problème technique, merci de nous le signaler immédiatement. \n\n😶‍🌫️ | Sans participation de votre part, la tutrice se réserve le droit de vous demander de partir."
      )
      .setThumbnail(
        "https://media.discordapp.net/attachments/814908646138970122/1019335443340345424/bipilibibibilipi.png"
      );

    interaction.reply({
      content: `<@${user.id}>`,
      embeds: [embed],
    });
  },
};

export default participation;
