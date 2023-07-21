import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../Command";

// data: new SlashCommandBuilder()
// 	.setName('ping')
// 	.setDescription('Replies with Pong!'),
// async execute(interaction) {
// 	await interaction.reply('Pong!');
// },

const ping: Command = {
  description: "Replies with Pong!",

  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),

  async run(interaction: CommandInteraction) {
    await interaction.reply("Pong!");
  },
};

export default ping;
