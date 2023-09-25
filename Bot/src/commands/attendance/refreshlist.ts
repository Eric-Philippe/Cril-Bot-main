import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { isMostRecentSheetSetup } from "../../GoogleAPI/Drive/File.database";
import Messages from "../../middlewares/Messages/Messages";
import InscriptionManager from "../../middlewares/Attendance/InscriptionManager";
import Logger from "../../logger/Logger";
import { Colors } from "../../middlewares/Messages/Colors";
import { Emotes } from "../../middlewares/Messages/Emotes";
import { getSheetURL } from "../../GoogleAPI/Sheets/Sheets";
import Controllers from "../../middlewares/Controllers/Controllers";
import { Command } from "../../models/Command";

const refreshlist: Command = {
  description: "Refresh the list of inscriptions",

  data: new SlashCommandBuilder()
    .setName("refreshlist")
    .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)
    .setDescription(
      "Read the list of the sheets and save them in the database"
    ),
  async run(interaction) {
    interaction.deferReply();
    const sheetId = await isMostRecentSheetSetup();
    if (sheetId == null)
      return Messages.sendError(
        interaction,
        "No sheet setup ! Please use /enterlist to setup a sheet"
      );
    try {
      await InscriptionManager.refreshInscriptions(sheetId);

      let embed = Messages.buildEmbed(
        Emotes.SUCCESS + " | The list has been successfully refreshed",
        "Refresh list",
        Colors.GREEN
      );
      let buttonLink = Controllers.LINK_BUTTON(
        "Open the list",
        await getSheetURL(sheetId)
      );

      await Messages.updateReply(
        interaction,
        embed,
        Controllers.buildRows(buttonLink)
      );
    } catch (e) {
      Logger.logError(e);
    }
  },
};

export default refreshlist;
