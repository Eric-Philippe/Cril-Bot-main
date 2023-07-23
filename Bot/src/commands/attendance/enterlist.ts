import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../Command";
import { textToArray } from "../../middlewares/Attendance/utils/converter";

const ping: Command = {
  description: "Replies with Pong!",

  data: new SlashCommandBuilder()
    .setName("enterlist")
    .setDescription("TODO: Add description")
    .addAttachmentOption((option) =>
      option.setName("file").setDescription("Contenu collé du tableau")
    )
    .addStringOption((option) =>
      option.setName("text").setDescription("Si le texte est trop court")
    ),

  async run(interaction: CommandInteraction) {
    // Get the content of the file
    const file = interaction.options.get("file");
    const text = interaction.options.get("text");

    let content;

    if (file) {
      content = file.value;
    } else if (text) {
      content = text.value;
    }
    console.log(content);

    console.log(textToArray(content));

    await interaction.reply("TODO: Add reply");
  },
};

export default ping;
