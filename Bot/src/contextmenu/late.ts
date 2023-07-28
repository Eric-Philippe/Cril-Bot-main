import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
  UserContextMenuCommandInteraction,
} from "discord.js";

import { ContextMenu } from "../models/ContextMenu";

const late: ContextMenu = {
  data: new ContextMenuCommandBuilder()
    .setName("Late")
    .setType(ApplicationCommandType.User)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.PrioritySpeaker),
  async run(interaction: UserContextMenuCommandInteraction) {
    const user = interaction.options.getUser("user", true);

    const embed = new EmbedBuilder()
      .setColor("#4f70b8")
      .setDescription(
        "⏰ | Bonjour, vous êtes trop en retard pour participer à l’activité, nous ne pouvons pas vous accepter. Vous serez noté en __**‘absent justifié'**__ pour cette séance. \n\n📧 | Contactez cril.langues@iut-tlse3.fr pour toute question"
      )
      .setThumbnail(
        "https://media.discordapp.net/attachments/814908646138970122/1019335451737342032/blurp.png"
      );

    interaction.reply({
      content: `<@${user.id}>`,
      embeds: [embed],
    });
  },
};

export default late;
