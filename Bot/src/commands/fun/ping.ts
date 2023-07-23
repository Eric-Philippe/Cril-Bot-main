import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../Command";

const ping: Command = {
  description: "Replies with Pong!",

  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!")
    .addAttachmentOption((option) =>
      option
        .setName("file")
        .setDescription("The file to upload")
        .setRequired(true)
    ),

  async run(interaction: CommandInteraction) {
    await interaction.reply("Pong!");
  },
};

export default ping;
