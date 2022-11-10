const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const fs = require("fs");

const OXY = require("../oxy.json");

module.exports = {
  desc: {
    desc: "Compteur accéssible facilement en DM !",
    emote: "🧽",
    exemple: [
      {
        cmd: "/oxy-questions",
        desc: "Envoie un DM avec un bouton un message pour pouvoir cliquer et compter un item de votre choix.",
      },
    ],
    usage: "/oxy-questions",
  },
  data: new SlashCommandBuilder()
    .setName("oxy-questions")
    .setDescription(
      "Envoie un DM avec un bouton un message pour pouvoir cliquer et compter un item de votre choix."
    ),
  /**
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    // Check if the user is in the OXY obj
    if (OXY.OXY[interaction.user.id])
      return interaction.reply({
        content: "Vous ne pouvez pas lancer deux oxy counter à la fois !",
        ephemeral: true,
      });

    // Send the DM
    let embed = new EmbedBuilder()
      .setAuthor({
        name: "Oxy Counter",
        iconURL: interaction.user.avatarURL(),
      })
      .setTitle("Click on me to add +1 to the counter !")
      .setColor("#de9ac0")
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/910200998339944479/1040168647609548890/QUESTIONS.png"
      );

    let row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("add")
        .setLabel("Add +1")
        .setStyle(ButtonStyle.Primary)
        .setEmoji("🧽")
    );

    try {
      interaction.user.send({ embeds: [embed], components: [row] });
      interaction.reply({
        content: "DM envoyé, consultez vos messages privés !",
        ephemeral: true,
      });
      // Create the obj in the OXY
      OXY.OXY[interaction.user.id] = [];
      fs.writeFileSync("./oxy.json", JSON.stringify(OXY, null, 2));
    } catch (e) {
      return interaction.reply({
        content:
          "Vous devez activer les messages privés pour utiliser cette commande !",
        ephemeral: true,
      });
    }
  },
};
