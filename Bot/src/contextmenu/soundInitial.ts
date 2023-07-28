import {
  ApplicationCommandType,
  AttachmentBuilder,
  ContextMenuCommandBuilder,
  EmbedBuilder,
  PermissionsBitField,
  UserContextMenuCommandInteraction,
} from "discord.js";

import { ContextMenu } from "../models/ContextMenu";
import { ADMIN_ROLE } from "../res/ContexteRessources";

const soundInitial: ContextMenu = {
  data: new ContextMenuCommandBuilder()
    .setName("Sound problem")
    .setType(ApplicationCommandType.User)
    .setDefaultMemberPermissions(PermissionsBitField.Flags.PrioritySpeaker),
  async run(interaction: UserContextMenuCommandInteraction) {
    const user = interaction.options.getUser("user", true);

    const embed = new EmbedBuilder()
      .setColor("#4f70b8")
      .setDescription(
        "🔇 | Il semble que vous rencontrez des problèmes de son. Merci de suivre les étapes dans ce document pour les résoudre. Si les problèmes persistent et que vous ne pouvez pas participer, vous serez noté en ‘absent justifié’ pour cette séance."
      );

    const file = new AttachmentBuilder("./docs/Support_Vocal.pdf");

    interaction.reply({
      content: `<@${user.id}> | <@&${ADMIN_ROLE}>`,
      allowedMentions: { roles: [ADMIN_ROLE] },
      embeds: [embed],
      files: [file],
    });
  },
};

export default soundInitial;
