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

    if (!file && !text) {
      await interaction.reply("Merci de pas être con");
      return;
    }

    let content;

    if (file) {
      let response = await fetch(file.attachment.url);
      content = await response.text();
    } else if (text) {
      content = text.value;
    }

    let result = textToArray(content);
    if (result.returnCode == 0) {
      await interaction.reply(
        `J'ai trouvé ${result.result.length} inscriptions`
      );
    } else {
      await interaction.reply("Il y a eu une erreur");
    }
  },
};

export default ping;
