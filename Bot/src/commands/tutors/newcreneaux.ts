import {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} from "discord.js";

import { ROLE_ETU, CHAN_SUPPORT } from "../../config/config.guild";
import { Command } from "../../models/Command";

const newcreneaux: Command = {
  description: "Message générique pour de nouveaux créneaux.",
  data: new SlashCommandBuilder()
    .setName("new-creneaux")
    .setDefaultMemberPermissions(PermissionFlagsBits.PrioritySpeaker)
    .setDMPermission(false)
    .setDescription("Message générique pour de nouveaux créneaux."),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async run(interaction) {
    let embed = new EmbedBuilder()
      .setTitle("De nouveaux créneaux sont disponibles !")
      .setColor("DarkRed")
      .setDescription(
        "Hello !!!\n" +
          "De nouveaux créneaux sont disponibles à la réservation sur Résacril, en activité interaction et en coaching, en anglais et en espagnol. \n" +
          "Comme d’habitude, vous avez le choix entre du présentiel et du distanciel, des discussions libres de tous niveaux, des discussions thématiques, des jeux… \n" +
          "Toutes les précisions sur le thème, le niveau et le lieu sont affichées sur Résacril au moment de la réservation. \n" +
          "Des créneaux sont susceptibles d’être ajoutés au fil de l’eau. \n\n" +
          "Retrouvez les principaux thèmes et jeux prévus dans l’affiche ci-dessous. \n\n" +
          `En cas de question, <#${CHAN_SUPPORT}> Support ou mail à \n __cril.langues@iut-tlse3.fr__ \n\n` +
          "A bientôt au CRIL!"
      )
      .setThumbnail(
        "https://media.discordapp.net/attachments/739553949199106158/922311422166306826/calendardatemonthplannerreminderscheduleicon-1320196664736011804.png"
      )
      .setTimestamp();
    interaction.reply({
      content: "Message correctement envoyé !",
      ephemeral: true,
    });
    interaction.channel.send({
      content: `||<@&${ROLE_ETU}>||`,
      embeds: [embed],
    });
  },
};

export default newcreneaux;
