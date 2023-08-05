import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Colors } from "../../middlewares/Messages/Colors";
import { Command } from "../../models/Command";

const help: Command = {
  description: "Help Command",

  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Send the bot's documentation."),
  async run(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("📚 - Documentation du CrilBot - ")
      .setColor(Colors.PURPLE)
      .setFooter({ text: "Cril Bot" })
      .setDescription(
        `[Lien vers la documentation](https://eric-p.gitbook.io/cril-bot-documentation/)`
      )
      .setURL("https://eric-p.gitbook.io/cril-bot-documentation/");

    interaction.reply({ embeds: [embed] });
  },
};

export default help;
