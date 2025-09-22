import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import Messages from "../../middlewares/Messages/Messages";
import { Command } from "../../models/Command";
import { ButtonId } from "../../res/ButtonID";
import Controllers from "../../middlewares/Controllers/Controllers";
import { Colors } from "../../middlewares/Messages/Colors";
import { TossesManager } from "../../app/Toss/TossesManager";

const toss: Command = {
  description: "Créé un tirage au sort dynamique !",

  data: new SlashCommandBuilder()
    .setName("toss")
    .setDescription("Créé un tirage au sort dynamique !")
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .setDMPermission(false)
    .addStringOption((option) =>
      option
        .setName("titre")
        .setDescription("Titre du tirage au sort")
        .setMaxLength(35)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Description du tirage au sort")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("footer")
        .setDescription("Footer du tirage au sort")
        .setRequired(true)
    ) as SlashCommandBuilder,
  async run(interaction) {
    const title = interaction.options.getString("titre");
    let description = interaction.options.getString("description");
    const footer = interaction.options.getString("footer");

    description = description + "\n\n" + "🗳️" + " **0 participant**";

    const tossEmbed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setFooter({ text: footer })
      .setColor(Colors.BLUE_TOSS)
      .setTimestamp();

    const participateButton = Controllers.createButton(
      "Participer",
      ButtonId.TOSS_PARTICIPATE,
      ButtonStyle.Success,
      "🗳️"
    );

    const endTossButton = Controllers.createButton(
      "Terminer",
      ButtonId.TOSS_END,
      ButtonStyle.Primary,
      "🏁"
    );

    const tossActionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
      participateButton,
      endTossButton
    );

    try {
      const msg = await interaction.channel.send({
        embeds: [tossEmbed],
        components: [tossActionRow],
      });

      TossesManager.createTossStatus(msg.id);

      Messages.sendSuccess(
        interaction,
        "Tirage au sort créé avec succès !",
        null,
        true
      );
    } catch (e) {
      Messages.sendError(
        interaction,
        "Une erreur est survenue lors de la création du tirage au sort !"
      );
    }
  },
};

export default toss;
