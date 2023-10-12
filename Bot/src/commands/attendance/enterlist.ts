import { PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import { textToArray } from "../../middlewares/Attendance/TextToInscriptions";
import InscriptionManager from "../../middlewares/Attendance/InscriptionManager";
import { getSheetURL, initSheet } from "../../GoogleAPI/Sheets/Sheets";
import Messages from "../../middlewares/Messages/Messages";
import {
  isMostRecentSheetSetup,
  setMostRecentSheetId,
} from "../../GoogleAPI/Drive/File.database";
import { createTodaySheet } from "../../GoogleAPI/Drive/File.service";
import { Emotes } from "../../middlewares/Messages/Emotes";
import Controllers from "../../middlewares/Controllers/Controllers";
import { Colors } from "../../middlewares/Messages/Colors";
import { Command } from "../../models/Command";
import Operation from "../../models/Operation";
import { Inscription } from "../../middlewares/Attendance/models/Inscription";

const enterlist: Command = {
  description: "Entrer une liste de présence de Resacril",

  data: new SlashCommandBuilder()
    .setName("enterlist")
    .setDescription("Entrer une liste de présence de Resacril")
    .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)
    .addAttachmentOption((option) =>
      option.setName("file").setDescription("Contenu collé du tableau")
    )
    .addStringOption((option) =>
      option.setName("text").setDescription("Si le texte est trop court")
    ),

  async run(interaction) {
    await interaction.deferReply();
    let embed = Messages.buildEmbed(
      `${Emotes.INFO} | Découpage des informations en cours...`
    );
    await Messages.updateReply(interaction, embed);

    // Get the content of the file
    const file = interaction.options.get("file");
    const text = interaction.options.get("text");

    if (!file && !text) {
      Messages.sendError(
        interaction,
        "Merci de fournir un fichier ou un texte"
      );
      return;
    }

    let content;

    try {
      if (file) {
        let response = await fetch(file.attachment.url);
        content = await response.text();
      } else if (text) {
        content = text.value;
      }
    } catch (e) {
      await Messages.sendError(
        interaction,
        "Il y a eu une erreur lors de la récupération du fichier. Merci de vérifier que le texte envoyé est bien correct."
      );
      return;
    }

    let result: Operation<Inscription[]>;
    try {
      result = textToArray(content);
    } catch (e) {
      await Messages.sendError(
        interaction,
        "Une erreur est survenue lors de son découpage. Merci de vérifier que le texte envoyé est bien correct."
      );
      return;
    }

    if (result.returnCode == 0) {
      embed = Messages.buildEmbed(
        `${Emotes.INFO} | Enregistrement des informations en cours...`
      );
      await Messages.updateReply(interaction, embed);

      let sheetId = await isMostRecentSheetSetup();
      if (sheetId != null)
        return Messages.sendError(
          interaction,
          "Une liste a déjà été entrée aujourd'hui. Merci de contacter un administrateur pour plus d'informations."
        );

      await InscriptionManager.saveInscriptionOnDB(result.result);

      try {
        embed = Messages.buildEmbed(
          `${Emotes.INFO} | Création de la feuille en cours...`
        );

        sheetId = await createTodaySheet();
        await setMostRecentSheetId(sheetId);
      } catch (e) {
        await Messages.sendError(
          interaction,
          "Une erreur est survenue lors de la création de la feuille. Merci de contacter un administrateur pour plus d'informations."
        );
        return;
      }

      try {
        let embedD = Messages.buildEmbed(
          `${Emotes.INFO} | Formatage et insertions des données de la feuille en cours...`
        );
        await Messages.updateReply(interaction, embedD);
        await initSheet(sheetId);

        const embed = Messages.buildEmbed(
          `${Emotes.SUCCESS} | Feuille créée !`,
          `Vous pouvez la retrouver en cliquant sur le bouton !`,
          Colors.GREEN
        );
        const linkButton = Controllers.LINK_BUTTON(
          "Accéder à la feuille",
          await getSheetURL(sheetId),
          Emotes.SPREADSHEET
        );

        const rows = Controllers.buildRows(linkButton);

        await Messages.updateReply(interaction, embed, rows);
      } catch (e) {
        await Messages.sendError(
          interaction,
          "Une erreur est survenue lors de l'initialisation / formatage de la feuille. Merci de contacter un administrateur pour plus d'informations."
        );
        return;
      }
    } else {
      await Messages.sendError(
        interaction,
        "Le fichier n'est pas au bon format. Merci de vérifier que vous avez copié la totalité du tableau sur Resacril."
      );
    }
  },
};

export default enterlist;
