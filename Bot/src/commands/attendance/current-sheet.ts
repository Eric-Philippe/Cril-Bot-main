import {
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { isMostRecentSheetSetup } from "../../GoogleAPI/Drive/File.database";
import Messages from "../../middlewares/Messages/Messages";
import { Colors } from "../../middlewares/Messages/Colors";
import { Emotes } from "../../middlewares/Messages/Emotes";
import { getSheetURL } from "../../GoogleAPI/Sheets/Sheets";
import Controllers from "../../middlewares/Controllers/Controllers";
import { Command } from "../../models/Command";

const currentSheet: Command = {
  description: "Give a direct link to the current Sheet",

  data: new SlashCommandBuilder()
    .setName("current-sheet")
    .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)
    .setDescription("Give a direct link to the current Sheet"),
  async run(interaction) {
    const sheetId = await isMostRecentSheetSetup();
    if (sheetId == null)
      return Messages.sendError(
        interaction,
        "No sheet setup ! Please use /enterlist to setup a sheet"
      );

    const sheetURL = await getSheetURL(sheetId);
    const embed = new EmbedBuilder()
      .setTitle("Feuille de présence")
      .setURL(sheetURL)
      .setColor(Colors.GREEN)
      .setDescription(
        "Cliquez sur le bouton pour accéder à la feuille de présence"
      );

    const linkButton = Controllers.LINK_BUTTON(
      "Feuille de présence",
      sheetURL,
      Emotes.SPREADSHEET
    );

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(linkButton);

    await interaction.reply({ embeds: [embed], components: [row] });
  },
};

export default currentSheet;
