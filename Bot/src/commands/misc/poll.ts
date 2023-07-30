import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import Messages from "../../middlewares/Messages/Messages";
import { Command } from "../../models/Command";
import { ButtonId } from "../../res/ButtonID";

const Emote_Numbers_Array = [
  "1️⃣",
  "2️⃣",
  "3️⃣",
  "4️⃣",
  "5️⃣",
  "6️⃣",
  "7️⃣",
  "8️⃣",
  "9️⃣",
  "🔟",
];

const poll: Command = {
  description: "Créé un sondage interactif !",

  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Créé un sondage interactif !")
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("The question to ask")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("answer1")
        .setDescription("Answer 1")
        .setMaxLength(35)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("answer2")
        .setDescription("Answer 2")
        .setMaxLength(35)
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("answer3").setDescription("Answer 3").setMaxLength(35)
    )
    .addStringOption((option) =>
      option.setName("answer4").setDescription("Answer 4").setMaxLength(35)
    )
    .addStringOption((option) =>
      option.setName("answer5").setDescription("Answer 5").setMaxLength(35)
    ),
  async run(interaction) {
    const enonce = interaction.options.getString("question");

    let answers = [];
    let answer;
    for (let i = 1; i <= 5; i++) {
      answer = interaction.options.getString(`answer${i}`);
      if (!answer) break;
      answers.push(answer);
    }

    const pollEmbed = new EmbedBuilder()
      .setTitle("📊 " + enonce)
      .setColor("Random")
      .setFooter({ text: `#️⃣ | Demandé par ${interaction.user.username}` })
      .setAuthor({ name: "SONDAGE" });

    const row = new ActionRowBuilder<ButtonBuilder>();

    for (let i = 0; i < answers.length; i++) {
      pollEmbed.addFields({
        name: Emote_Numbers_Array[i] + " " + answers[i],
        value: "``" + "⬛⬛⬛⬛⬛⬛⬛⬛⬛" + "`` | 0.0% (0)",
      });

      row.addComponents(
        new ButtonBuilder()
          .setEmoji(Emote_Numbers_Array[i])
          .setStyle(ButtonStyle.Primary)
          .setCustomId(ButtonId.POLL + String(i))
      );
    }

    await interaction.channel.send({
      embeds: [pollEmbed],
      components: [row],
    });

    Messages.sendSuccess(interaction, "Sondage créé avec succès !", null, true);
  },
};

export default poll;
