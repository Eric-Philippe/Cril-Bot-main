import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { Command } from "../../models/Command";
import { createScolarYearFolders } from "../../GoogleAPI/Drive/Folder.service";
import Messages from "../../middlewares/Messages/Messages";

const createyearfolder: Command = {
  description: "Create all the google drive folders for the year",

  data: new SlashCommandBuilder()
    .setName("createyearfolder")
    .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)
    .setDescription("Create all the google drive folders for the year"),
  async run(interaction) {
    await interaction.deferReply();

    try {
      await createScolarYearFolders();
      Messages.sendSuccess(
        interaction,
        "Les dossiers par mois pour l'année scolaire sont bien créés !"
      );
    } catch (e) {
      Messages.sendError(
        interaction,
        "Une erreur est survenue merci de contacter un administrateur !"
      );
    }
  },
};

export default createyearfolder;
