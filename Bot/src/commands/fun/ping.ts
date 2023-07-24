import { SlashCommandBuilder } from "discord.js";

const ping = {
  description: "Replies with Pong!",

  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async run(interaction) {
    await interaction.reply("Pong!");
  },
};

export default ping;
