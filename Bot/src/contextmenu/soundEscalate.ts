import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
  UserContextMenuCommandInteraction,
} from "discord.js";

import { ContextMenu } from "../models/ContextMenu";
import { ADMIN_ROLE } from "../config/config.guild";

const soundEscalate: ContextMenu = {
  data: new ContextMenuCommandBuilder()
    .setName("Sound Stuck")
    .setType(ApplicationCommandType.User)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.PrioritySpeaker),
  async run(interaction: UserContextMenuCommandInteraction) {
    const user = interaction.options.getUser("user", true);

    const embed = new EmbedBuilder()
      .setColor("#4f70b8")
      .setDescription(
        "🔇 | Nous ne pouvons pas valider votre activité si des problèmes de son vous empêchent de participer. Vous pouvez quitter la conversation, vous ne serez pas pénalisé. Merci de régler les problèmes de son d’ici votre prochaine séance à distance. Vous pouvez nous contacter sur <#1018802206536896532> ou par mail à cril.langues@iut-tlse3.fr pour demander de l’aide."
      );

    interaction.reply({
      content: `<@${user.id}> | <@&${ADMIN_ROLE}>`,
      allowedMentions: { roles: [ADMIN_ROLE] },
      embeds: [embed],
    });
  },
};

export default soundEscalate;
