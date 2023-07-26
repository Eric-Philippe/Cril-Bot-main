import { SlashCommandBuilder } from "discord.js";
import { Command } from "../../Command";

const ping: Command = {
  description: "Replies with Pong!",

  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async run(interaction) {
    await interaction.reply("Pong!");
  },
};

export default ping;
