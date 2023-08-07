import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../models/Command";

const ping: Command = {
  description: "Replies with Pong!",

  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async run(interaction) {
    await interaction.reply("Pong! 🏓");
    await interaction.followUp("Plop... I don't do sports anyway.");
  },
};

export default ping;
