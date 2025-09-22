import { SlashCommandBuilder } from "discord.js";
import Messages from "../../middlewares/Messages/Messages";
import { getRandInt } from "../../utils/Number";
import { Command } from "../../models/Command";

const dice: Command = {
  description: "Lance un dé!",

  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("Lance un dé à 6 faces !")
    .addIntegerOption((option) =>
      option.setName("faces").setDescription("Le nombre de faces du dé")
    ) as SlashCommandBuilder,

  async run(interaction) {
    let faces = interaction.options.getInteger("faces") || 6;
    let result = getRandInt(faces, 1);
    const embedResult = Messages.buildEmbed(
      `🎲 | Le dé est tombé sur ${result} ! `,
      "🎲 Lancé de dé !"
    );

    const embedInit = Messages.buildEmbed(
      "Lancé du dé à " + faces + " faces !",
      "🎲 Lancé de dé !"
    );

    Messages.sendInteraction(interaction, embedInit);

    setTimeout(() => {
      Messages.updateReply(interaction, embedResult);
    }, 2000);
  },
};

export default dice;
